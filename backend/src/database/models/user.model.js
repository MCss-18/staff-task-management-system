import { format } from "date-fns";

export class UserModel {

   async getPaginatedUsers(connection, limit, offset, search) {
    const query = [
      'SELECT ',
      'u.id_usuario, ' ,
      'u.nombres, ' ,
      'u.apellidos, ',
      'u.usuario, ',
      'u.correo, ',
      'u.clave, ',
      'u.rol_id, ',
      'r.rol, ',
      'u.estado, ',
      'u.fecha_creacion, ',
      'u.fecha_modificacion ',
      'FROM usuario u',
      'INNER JOIN rol r ON u.rol_id = r.id_rol',
      'WHERE u.nombres LIKE ? OR u.apellidos LIKE ?',
      'ORDER BY u.id_usuario',
      'LIMIT ? OFFSET ?'
    ].join('\n')
  
    const values = [`%${search}%`, `%${search}%`, Number(limit), Number(offset)]
    const [ rows ] = await connection.query(query, values);
  
    const formattedRows = rows.map(row => ({
      userId: row.id_usuario,
      names: row.nombres,
      surnames: row.apellidos,
      username: row.usuario,
      email: row.correo,
      rolId: row.rol_id,
      rolUser: row.rol,
      state: row.estado,
      creationDate: row.fecha_creacion ? format(new Date(row.fecha_creacion), 'dd-MM-yyyy') : 'Fecha no disponible',
      modificationDate: row.fecha_modificacion ? format(new Date(row.fecha_modificacion), 'dd-MM-yyyy') : 'Fecha no disponible'
    }))
  
    return formattedRows;
  }
  
  async getTotalPageUsers(connection, search) {
    const query = [
      'SELECT COUNT(*) AS total',
      'FROM usuario ',
      'WHERE nombres LIKE ? OR apellidos LIKE ?'
    ].join('\n')
  
    const values = [`%${search}%`, `%${search}%`];
  
    const [ rows ] = await connection.query(query, values);
    return rows[0].total;
  }
  
  async getUsers(connection){
    const query = [
      'SELECT ',
      'u.id_usuario, ' ,
      'u.nombres, ' ,
      'u.apellidos, ',
      'u.usuario, ',
      'u.correo, ',
      'u.clave, ',
      'u.rol_id, ',
      'r.rol_usuario, ',
      'u.estado, ',
      'u.fecha_creacion, ',
      'u.fecha_modificacion ',
      'FROM usuario u',
      'INNER JOIN rol_usuario r ON u.rol_id = r.id_rol_usuario',
      'ORDER BY u.id_usuario',
    ].join('\n')
  
    const [ rows ] = await connection.query(query);
  
    const formattedRows = rows.map(row => ({
      userId: row.id_usuario,
      name: row.nombres,
      surname: row.apellidos,
      username: row.usuario,
      email: row.correo,
      rolUser: row.rol_usuario,
      state: row.estado,
      creationDate: row.fecha_creacion,
      modificationDate: row.fecha_modificacion
    }))
  
    return formattedRows;
  }
  
  async getUserById (connection, userId){
    const query = [
      'SELECT ',
      'id_usuario, ' ,
      'nombres, ' ,
      'apellidos, ',
      'usuario, ',
      'correo, ',
      'clave, ',
      'rol_id, ',
      'estado, ',
      'fecha_creacion, ',
      'fecha_modificacion ',
      'FROM usuario ',
      'WHERE id_usuario = ? '
    ].join('\n')
  
    const values = [userId]
  
    const [ rows ] = await connection.query(query, values);
  
    const formattedRows = rows.map(row => ({
      userId: row.id_usuario,
      names: row.nombres,
      surnames: row.apellidos,
      username: row.usuario,
      email: row.correo,
      rolId: row.rol_id,
      state: row.estado,
      creationDate: row.fecha_creacion,
      modificationDate: row.fecha_modificacion
    }))
  
    return formattedRows;
  }
  
  async createUser (connection, userData){
    const { names, surnames, username, email, password, rolId } = userData;
  
    const query = [
      'INSERT INTO',
      'usuario',
      '( nombres, ' ,
      'apellidos, ',
      'usuario, ',
      'correo, ',
      'clave, ',
      'rol_id, ',
      'estado, ',
      'fecha_creacion)',
      'VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)'
    ].join('\n')
  
    const values = [names, surnames, username, email ?? '', password, rolId, true]
  
    const result = await connection.query(query, values);
    return result;
  }
  
  async updateUser (connection, userId, userData){
    const { names, surnames, username, email, password, rolId, state } = userData;
    const values = [ names, surnames, username, email, rolId, state ]
    
    const query = [
      'UPDATE usuario SET',
      'nombres = IFNULL(?, nombres), ' ,
      'apellidos = IFNULL(?, apellidos), ',
      'usuario = IFNULL(?, usuario), ',
      'correo = IFNULL(?, correo), ',
      'rol_id = IFNULL(?, rol_id), ',
      'estado = IFNULL(?, estado)',
    ]
    
    if (password) {
      query.push(', clave = IFNULL(?, clave) ');
      values.push(password);
    }
    values.push(userId);
  
    query.push(`WHERE id_usuario = ?`);
  
    const result = connection.query(query.join('\n'), values);
    return result.rows;  
  }
  
  // async updateLastSession(connection, userId)  {
  //   const query = [
  //     'UPDATE usuario SET',
  //     'ultima_sesion = CURRENT_TIMESTAMP',
  //     'WHERE ' ,
  //     ' id_usuario = ?'
  //   ].join('\n')
  
  //   const result = connection.query(query, [userId]);
  //   return result.rows;  
  // }
  
  async getUserByUsername(connection, username, excludeUserId = null)  {
    const query = [
      'SELECT ',
      'id_usuario, ' ,
      'nombres, ' ,
      'apellidos, ',
      'usuario, ',
      'correo, ',
      'clave, ',
      'rol_id, ',
      'estado, ',
      'fecha_creacion, ',
      'fecha_modificacion ',
      'FROM usuario ',
      'WHERE usuario = ? '
    ]
    const values = [username]
  
    if (excludeUserId) {
      query.push('AND id_usuario != ?');
      values.push(excludeUserId);
    }
  
    const [ rows ] = await connection.query(query.join('\n') , values);
  
    const formattedRows = rows.map(row => ({
      userId: row.id_usuario,
      names: row.nombres,
      surnames: row.apellidos,
      username: row.usuario,
      email: row.correo,
      password: row.clave,
      rolId: row.rol_id,
      state: row.estado,
      creationDate: row.fecha_creacion,
      modificationDate: row.fecha_modificacion
    }))
  
    return formattedRows;  
  }

  async getUserByEmail(connection, email, excludeUserId = null)  {
    const query = [
      'SELECT ',
      'id_usuario, ' ,
      'nombres, ' ,
      'apellidos, ',
      'correo, ',
      'clave, ',
      'rol_id, ',
      'estado, ',
      'fecha_creacion, ',
      'fecha_modificacion ',
      'FROM usuario ',
      'WHERE correo = ? '
    ]
    const values = [email]
  
    if (excludeUserId) {
      query.push('AND id_usuario != ?');
      values.push(excludeUserId);
    }
  
    const [ rows ] = await connection.query(query.join('\n') , values);
  
    const formattedRows = rows.map(row => ({
      userId: row.id_usuario,
      names: row.nombres,
      surnames: row.apellidos,
      email: row.correo,
      password: row.clave,
      rolId: row.rol_id,
      state: row.estado,
      creationDate: row.fecha_creacion,
      modificationDate: row.fecha_modificacion
    }))
  
    return formattedRows;  
  }
}
