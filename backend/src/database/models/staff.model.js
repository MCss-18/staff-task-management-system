// import { format } from "date-fns";

// export class StaffModel {

//   async getPaginatedStaff(connection, limit, offset, search) {
//     const query = [
//       'SELECT ',
//       'id_personal, ' ,
//       'nombres, ' ,
//       'apellidos, ',
//       'estado, ',
//       'fecha_creacion, ',
//       'fecha_modificacion ',
//       'FROM personal',
//       'WHERE nombres LIKE ? OR apellidos LIKE ?',
//       'ORDER BY id_personal',
//       'LIMIT ? OFFSET ?'
//     ].join('\n');
  
//     const values = [`%${search}%`, `%${search}%`, Number(limit), Number(offset)]
//     const [ rows ] = await connection.query(query, values);
  
//     const formattedRows = rows.map(row => ({
//       staffId: row.id_personal,
//       names: row.nombres,
//       surnames: row.apellidos,
//       state: row.estado,
//       creationDate: row.fecha_creacion ? format(new Date(row.fecha_creacion), 'dd-MM-yyyy') : 'Fecha no disponible',
//       modificationDate: row.fecha_modificacion ? format(new Date(row.fecha_modificacion), 'dd-MM-yyyy') : 'Fecha no disponible'
//     }))
  
//     return formattedRows;
//   }
  
//   async getTotalPageStaff(connection, search) {
//     const query = [
//       'SELECT COUNT(*) AS total',
//       'FROM personal ',
//       'WHERE nombres LIKE ? OR apellidos LIKE ?'
//     ].join('\n')
  
//     const values = [`%${search}%`, `%${search}%`];
  
//     const [ rows ] = await connection.query(query, values);
//     return rows[0].total;
//   }
  
//   async getStaff(connection){
//     const query = [
//       'SELECT ',
//       'id_personal, ' ,
//       'nombres, ' ,
//       'apellidos, ',
//       'estado, ',
//       'fecha_creacion, ',
//       'fecha_modificacion ',
//       'FROM personal',
//       'ORDER BY id_personal',
//     ].join('\n')
  
//     const [ rows ] = await connection.query(query);
  
//     const formattedRows = rows.map(row => ({
//       staffId: row.id_personal,
//       names: row.nombres,
//       surnames: row.apellidos,
//       state: row.estado,
//       creationDate: row.fecha_creacion ? format(new Date(row.fecha_creacion), 'dd-MM-yyyy') : 'Fecha no disponible',
//       modificationDate: row.fecha_modificacion ? format(new Date(row.fecha_modificacion), 'dd-MM-yyyy') : 'Fecha no disponible'
//     }))
  
//     return formattedRows;
//   }
  
//   async getStaffById (connection, staffId){
//     const query = [
//       'SELECT ',
//       'id_personal, ' ,
//       'nombres, ' ,
//       'apellidos, ',
//       'estado, ',
//       'fecha_creacion, ',
//       'fecha_modificacion ',
//       'FROM personal ',
//       'WHERE id_personal = ? '
//     ].join('\n')
  
//     const values = [staffId]
  
//     const [ rows ] = await connection.query(query, values);
  
//     const formattedRows = rows.map(row => ({
//       staffId: row.id_personal,
//       names: row.nombres,
//       surnames: row.apellidos,
//       state: row.estado,
//       creationDate: row.fecha_creacion ? format(new Date(row.fecha_creacion), 'dd-MM-yyyy') : 'Fecha no disponible',
//       modificationDate: row.fecha_modificacion ? format(new Date(row.fecha_modificacion), 'dd-MM-yyyy') : 'Fecha no disponible'
//     }))
  
//     return formattedRows;
//   }
  
//   async createStaff (connection, staffData){
//     const { names, surnames, state} = staffData;
  
//     const query = [
//       'INSERT INTO',
//       'personal',
//       '( nombres, ' ,
//       'apellidos, ',
//       'estado) ',
//       'VALUES (?, ?, ?)'
//     ].join('\n')
  
//     const values = [names, surnames, state]
  
//     const result = await connection.query(query, values);
//     return result;
//   }
  
//   async updateStaff (connection, staffId, staffData){
//     const { names, surnames, state } = staffData;
//     const values = [ names, surnames, state, staffId]
    
//     const query = [
//       'UPDATE personal SET',
//       'nombres = IFNULL(?, nombres), ' ,
//       'apellidos = IFNULL(?, apellidos), ',
//       'estado = IFNULL(?, estado) ',
//       'WHERE id_personal = ?',
//     ]
    
//     const result = connection.query(query.join('\n'), values);
//     return result.rows;  
//   }
  
// }
