
export class TypeTaskModel {

  async getTypeTasks(connection){
    const query = [
      "SELECT ",
      "id_tipo_tarea, ",
      "cod_ot, ",
      "descripcion ",
      "FROM tipo_tarea ",
    ].join('\n')
  
    const [ rows ] = await connection.query(query);
  
    const formattedRows = rows.map(row => ({
      typeTaskId: row.id_tipo_tarea,
      codOt: row.cod_ot,
      typeTask: row.descripcion
    }))
  
    return formattedRows;
  }
}