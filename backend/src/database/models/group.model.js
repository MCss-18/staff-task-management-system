import { format } from "date-fns";

export class GroupModel {

  async getPaginatedGroups(connection, limit, offset, search) {
    const query = `
      SELECT 
        g.id_grupo, 
        g.usuario_lider_id, 
        u.nombres, 
        u.apellidos, 
        g.descripcion, 
        g.estado, 
        g.fecha_creacion, 
        g.fecha_modificacion,
        COUNT(gm.id_grupo_miembro) AS cantidad_miembros
      FROM grupo g
      INNER JOIN usuario u ON g.usuario_lider_id = u.id_usuario
      LEFT JOIN grupo_miembro gm ON g.id_grupo = gm.grupo_id
      WHERE g.descripcion LIKE ? OR u.nombres LIKE ? OR u.apellidos LIKE ?
      GROUP BY g.id_grupo, g.usuario_lider_id, u.nombres, u.apellidos, g.descripcion, g.estado, g.fecha_creacion, g.fecha_modificacion
      ORDER BY g.id_grupo
      LIMIT ? OFFSET ?;
    `;

    const values = [`%${search}%`, `%${search}%`, `%${search}%`, Number(limit), Number(offset)];
    const [rows] = await connection.query(query, values);

    return rows.map(row => ({
      groupId: row.id_grupo,
      leadUserId: row.usuario_lider_id,
      userNames: row.nombres,
      userSurnames: row.apellidos,
      nameGroup: row.descripcion,
      state: row.estado,
      creationDate: row.fecha_creacion ? format(new Date(row.fecha_creacion), 'dd-MM-yyyy') : 'Fecha no disponible',
      modificationDate: row.fecha_modificacion ? format(new Date(row.fecha_modificacion), 'dd-MM-yyyy') : 'Fecha no disponible',
      memberCount: row.cantidad_miembros
    }));
  }
  
  async getTotalPageGroups(connection, search) {
    const query = `
      SELECT COUNT(DISTINCT g.id_grupo) AS total
      FROM grupo g
      INNER JOIN usuario u ON g.usuario_lider_id = u.id_usuario
      LEFT JOIN grupo_miembro gm ON g.id_grupo = gm.grupo_id
      WHERE g.descripcion LIKE ? OR u.nombres LIKE ? OR u.apellidos LIKE ?;
    `;
  
    const values = [`%${search}%`, `%${search}%`, `%${search}%`];
  
    const [ rows ] = await connection.query(query, values);
    return rows[0].total;
  }
  
  async getPaginatedGroupsByLeadUserId(connection, leadUserId, limit, offset, search) {
    const query = `
      SELECT 
        g.id_grupo, 
        g.usuario_lider_id, 
        u.nombres, 
        u.apellidos, 
        g.descripcion, 
        g.estado, 
        g.fecha_creacion, 
        g.fecha_modificacion,
        COUNT(gm.id_grupo_miembro) AS cantidad_miembros
      FROM grupo g
      INNER JOIN usuario u ON g.usuario_lider_id = u.id_usuario
      LEFT JOIN grupo_miembro gm ON g.id_grupo = gm.grupo_id
      WHERE g.usuario_lider_id = ? 
        AND (g.descripcion LIKE ? OR u.nombres LIKE ? OR u.apellidos LIKE ?)
      GROUP BY g.id_grupo, g.usuario_lider_id, u.nombres, u.apellidos, g.descripcion, g.estado, g.fecha_creacion, g.fecha_modificacion
      ORDER BY g.id_grupo
      LIMIT ? OFFSET ?;
    `;

    const values = [leadUserId, `%${search}%`, `%${search}%`, `%${search}%`, Number(limit), Number(offset)];
    const [rows] = await connection.query(query, values);

    return rows.map(row => ({
      groupId: row.id_grupo,
      leadUserId: row.usuario_lider_id,
      userNames: row.nombres,
      userSurnames: row.apellidos,
      nameGroup: row.descripcion,
      state: row.estado,
      creationDate: row.fecha_creacion ? format(new Date(row.fecha_creacion), 'dd-MM-yyyy') : 'Fecha no disponible',
      modificationDate: row.fecha_modificacion ? format(new Date(row.fecha_modificacion), 'dd-MM-yyyy') : 'Fecha no disponible',
      memberCount: row.cantidad_miembros
    }));
  }
  
  async getTotalPageGroupsByLeadUserId(connection, leadUserId, search) {
    const query = `
      SELECT COUNT(DISTINCT g.id_grupo) AS total
      FROM grupo g
      INNER JOIN usuario u ON g.usuario_lider_id = u.id_usuario
      LEFT JOIN grupo_miembro gm ON g.id_grupo = gm.grupo_id
      WHERE g.usuario_lider_id = ? 
        AND (g.descripcion LIKE ? OR u.nombres LIKE ? OR u.apellidos LIKE ?);
    `;

  const values = [leadUserId, `%${search}%`, `%${search}%`, `%${search}%`];
  const [rows] = await connection.query(query, values);
  return rows[0].total;
}

  async getGroups(connection){
    const query = [
      'SELECT ',
      'g.id_grupo, ' ,
      'g.usuario_lider_id, ' ,
      'u.nombres, ' ,
      'u.apellidos, ' ,
      'g.descripcion, ' ,
      'g.estado, ',
      'g.fecha_creacion, ',
      'g.fecha_modificacion ',
      'FROM grupo g',
      'INNER JOIN usuario u ON g.usuario_lider_id = u.id_usuario',
      'ORDER BY id_grupo',
    ].join('\n')
  
    const [ rows ] = await connection.query(query);
  
    const formattedRows = rows.map(row => ({
      groupId: row.id_grupo,
      leadUserId: row.usuario_lider_id,
      userNames: row.nombres,
      userSurnames: row.apellidos,
      nameGroup: row.descripcion,
      state: row.estado,
      creationDate: row.fecha_creacion ? format(new Date(row.fecha_creacion), 'dd-MM-yyyy') : 'Fecha no disponible',
      modificationDate: row.fecha_modificacion ? format(new Date(row.fecha_modificacion), 'dd-MM-yyyy') : 'Fecha no disponible'
    }))
  
    return formattedRows;
  }
  
  async getGroupById (connection, groupId){
    const query = [
      'SELECT ',
      'g.id_grupo, ' ,
      'g.usuario_lider_id, ' ,
      'u.nombres, ' ,
      'u.apellidos, ' ,
      'g.descripcion, ' ,
      'g.estado, ',
      'g.fecha_creacion, ',
      'g.fecha_modificacion ',
      'FROM grupo g',
      'WHERE g.descripcion LIKE ? OR u.nombres LIKE ? OR u.apellidos LIKE ?',
      'WHERE id_grupo = ? '
    ].join('\n')
  
    const values = [groupId]
  
    const [ rows ] = await connection.query(query, values);
  
    const formattedRows = rows.map(row => ({
      groupId: row.id_grupo,
      leadUserId: row.usuario_lider_id,
      userNames: row.nombres,
      userSurnames: row.apellidos,
      nameGroup: row.descripcion,
      state: row.estado,
      creationDate: row.fecha_creacion ? format(new Date(row.fecha_creacion), 'dd-MM-yyyy') : 'Fecha no disponible',
      modificationDate: row.fecha_modificacion ? format(new Date(row.fecha_modificacion), 'dd-MM-yyyy') : 'Fecha no disponible'
    }))
  
    return formattedRows;
  }
  
  async createGroup (connection, groupData){
    const { nameGroup, state, leadUserId } = groupData;
    const query = [
      'INSERT INTO',
      'grupo',
      '( usuario_lider_id, ' ,
      'descripcion, ',
      'estado) ',
      'VALUES (?, ?, ?)'
    ].join('\n')
    
    const values = [leadUserId, nameGroup, state ]
    
    const result = await connection.query(query, values);
    return result;
  }
  
  async updateGroup (connection, groupId, groupData){
    const { nameGroup, state} = groupData;
    const query = [
      'UPDATE grupo SET',
      'descripcion = IFNULL(?, descripcion), ',
      'estado = IFNULL(?, estado) ',
      'WHERE id_grupo = ?',
    ].join('\n')
    
    const values = [ nameGroup, state, groupId]
    const result = connection.query(query, values);
    return result.rows;  
  }
  
}