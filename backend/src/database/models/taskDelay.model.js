export class TaskDelayModel {

  async getTaskDelayByTaskId (connection, taskId){
    const query = [
      'SELECT ',
      'td.id_tarea_demora, ' ,
      'td.tarea_id, ' ,
      'cd.descripcion, ',
      'td.observacion, ',
      'td.fecha, ',
      'td.hora_inicio, ',
      'td.hora_fin ',

      'FROM tarea_demora td',
      'LEFT JOIN categoria_demora cd ON td.categoria_demora_id = cd.id_categoria_demora',

      'WHERE td.tarea_id = ?',
      'ORDER BY td.fecha_creacion',
    ].join('\n');
  
    const values = [taskId]
    const [ rows ] = await connection.query(query, values)
    if (!rows || rows.length === 0) {
      return []; 
    }

    const formattedRows = rows.map(row => ({
      taskDelayId: row.id_tarea_demora,
      taskId: row.tarea_id,
      descripcionDelay: row.descripcion,
      observation: row.observacion,
      startTime: row.hora_inicio,
      endTime: row.hora_fin
    }))
    return formattedRows;
  }

  async createTaskDelay (connection, taskDelayData){
    const { taskId, categoryDelayId, startTime, endTime, observation } = taskDelayData;

    const query = [
      'INSERT INTO',
      'tarea_demora',
      '( tarea_id, ' ,
      'categoria_demora_id, ',
      'fecha, ',
      'hora_inicio, ',
      'hora_fin, ',
      'observacion, ',
      'estado) ',
      'VALUES (?, ?, CURDATE(), ?, ?, ?, ?)'
    ].join('\n')
  
    const values = [ taskId, categoryDelayId, startTime, endTime,  observation ?? "", 1 ]
  
    const result = await connection.query(query, values);
    return result;
  }

  async deleteTaskDelay (connection, taskDelayId){
    const values = [ taskDelayId]
    
    const query = [
      'DELETE tarea_demora SET',
      'WHERE id_tarea_demora = ?',
    ].join('\n')
    
    const result = connection.query(query, values);
    return result.rows;  
  }

}