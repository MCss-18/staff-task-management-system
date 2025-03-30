import { format } from "date-fns";

export class GroupMemberModel {

  async getPaginatedMembersByGroupId(connection, groupId, limit, offset, search) {
    const query = [
      'SELECT ',
      'gp.id_grupo_miembro, ' ,
      'gp.grupo_id, ' ,
      'p.id_usuario, ' ,
      'p.nombres, ' ,
      'p.apellidos, ' ,
      'gp.fecha_creacion, ',
      'gp.fecha_modificacion ',
      'FROM grupo_miembro gp',
      'INNER JOIN usuario p ON gp.usuario_tecnico_id = p.id_usuario',
      'WHERE gp.grupo_id = ? AND (p.nombres LIKE ? OR p.apellidos LIKE ?)',
      'ORDER BY gp.id_grupo_miembro',
      'LIMIT ? OFFSET ?'
    ].join('\n');
  
    const values = [groupId, `%${search}%`, `%${search}%`, Number(limit), Number(offset)]
    const [ rows ] = await connection.query(query, values);
  
    const formattedRows = rows.map(row => ({
      groupStaffId: row.id_grupo_miembro,
      groupId: row.grupo_id,
      staffId: row.id_usuario,
      names: row.nombres,
      surnames: row.apellidos,
      creationDate: row.fecha_creacion ? format(new Date(row.fecha_creacion), 'dd-MM-yyyy') : 'Fecha no disponible',
      modificationDate: row.fecha_modificacion ? format(new Date(row.fecha_modificacion), 'dd-MM-yyyy') : 'Fecha no disponible'
    }))
  
    return formattedRows;
  }
  
  async getTotalPageMembersByGroupId(connection, groupId, search) {
    const query = [
      'SELECT COUNT(*) AS total',
      'FROM grupo_miembro gp',
      'INNER JOIN usuario p ON gp.usuario_tecnico_id = p.id_usuario',
      'WHERE gp.grupo_id = ? AND (p.nombres LIKE ? OR p.apellidos LIKE ?)',
    ].join('\n')
  
    const values = [groupId, `%${search}%`, `%${search}%`];
  
    const [ rows ] = await connection.query(query, values);
    return rows[0].total;
  }

  async getMembersByGroupId (connection, groupId){
    const query = [
      'SELECT ',
      'gp.id_grupo_miembro, ' ,
      'gp.grupo_id, ' ,
      'gp.usuario_tecnico_id, ' ,
      'p.nombres, ' ,
      'p.apellidos ' ,
      'FROM grupo_miembro gp',
      'INNER JOIN usuario p ON gp.usuario_tecnico_id = p.id_usuario',
      'WHERE gp.grupo_id = ? '
    ].join('\n')
  
    const values = [groupId]
  
    const [ rows ] = await connection.query(query, values);
  
    const formattedRows = rows.map(row => ({
      groupStaffId: row.id_grupo_miembro,
      groupId: row.grupo_id,
      staffId: row.usuario_tecnico_id,
      names: row.nombres,
      surnames: row.apellidos,
    }))
  
    return formattedRows;
  }

  async getAvailableMembers (connection, groupId){
    const query = `
    SELECT 
    u.id_usuario AS usuario_tecnico_id, 
    u.nombres, 
    u.apellidos
    FROM usuario u
    LEFT JOIN grupo_miembro gm ON gm.usuario_tecnico_id = u.id_usuario 
      AND gm.grupo_id = ?
    WHERE u.rol_id = 3 AND  gm.usuario_tecnico_id IS NULL;
    `
    const values = [groupId]
  
    const [ rows ] = await connection.query(query, values);
  
    const formattedRows = rows.map(row => ({
      staffId: row.usuario_tecnico_id,
      names: row.nombres,
      surnames: row.apellidos
    }))
  
    return formattedRows;
  }

  async createGroupMember (connection, groupId, staffId){
    
    const query = [
      'INSERT INTO',
      'grupo_miembro',
      '( grupo_id, ' ,
      'usuario_tecnico_id) ',
      'VALUES (?, ?)'
    ].join('\n')
  
    const values = [ groupId, staffId ]
  
    const result = await connection.query(query, values);
    return result;
  }

  async updateGroupMember (connection, groupStaffId, groupMemberData){
    const { groupId, userId } = groupMemberData;
    
    const query = [
      'UPDATE grupo_miembro SET',
      'grupo_id = IFNULL(?, grupo_id), ' ,
      'usuario_tecnico_id = IFNULL(?, usuario_tecnico_id) ',
      'WHERE id_grupo_miembro = ?',
    ].join('\n')
    
    const values = [ groupId, userId, groupStaffId ]

    const result = connection.query(query, values);
    return result.rows;  
  }

  // async deleteGroupStaff (connection, groupStaffId){
    
  //   const query = [
  //     'DELETE FROM grupo_miembro',
  //     'WHERE id_grupo_miembro = ?',
  //   ].join('\n')
    
  //   const values = [ groupStaffId ]

  //   const result = connection.query(query, values);
  //   return result.rows;  
  // }


}