
export class RolModel {

  async getRoles(connection){
    const query = [
      "SELECT ",
      "id_rol, ",
      "rol ",
      "FROM rol ",
    ].join('\n')
  
    const [ rows ] = await connection.query(query);
  
    const formattedRows = rows.map(row => ({
      rolId: row.id_rol,
      rolUser: row.rol
    }))
  
    return formattedRows;
  }

}