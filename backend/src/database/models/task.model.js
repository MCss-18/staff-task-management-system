import { format } from "date-fns";

export class TaskModel {

  async getPaginatedTaskByGroupId(connection, groupId, limit, offset, search) {
    const query = [
      'SELECT ',
      't.id_tarea, ' ,
      't.grupo_miembro_id, ' ,
      'u.nombres, ' ,
      'u.apellidos, ' ,
      't.tipo_tarea_id, ',
      't.estado, ',
      'tt.cod_ot, ',
      'tt.descripcion, ',
      't.fecha_creacion, ',
      't.fecha_modificacion ',
      'FROM tarea t',
      'INNER JOIN grupo_miembro gp ON t.grupo_miembro_id = gp.id_grupo_miembro',
      'INNER JOIN usuario u ON gp.usuario_tecnico_id = u.id_usuario',
      'INNER JOIN tipo_tarea tt ON t.tipo_tarea_id = tt.id_tipo_tarea',
      'WHERE gp.grupo_id = ? AND (tt.cod_ot LIKE ? OR tt.descripcion LIKE ? OR u.apellidos LIKE ?)',
      'ORDER BY t.fecha_creacion',
      'LIMIT ? OFFSET ?'
    ].join('\n');
  
    const values = [groupId, `%${search}%`, `%${search}%`, `%${search}%`, Number(limit), Number(offset)]
    const [ rows ] = await connection.query(query, values);
  
    const formattedRows = rows.map(row => ({
      taskId: row.id_tarea,
      names: row.nombres,
      surnames: row.apellidos,
      typeStackId: row.tipo_tarea_id,
      state: row.estado,
      codOt: row.cod_ot,
      typeStack: row.descripcion,
      creationDate: row.fecha_creacion ? format(new Date(row.fecha_creacion), 'dd-MM-yyyy HH:mm:ss') : 'Fecha no disponible',
      modificationDate: row.fecha_modificacion ? format(new Date(row.fecha_modificacion), 'dd-MM-yyyy HH:mm:ss') : 'Fecha no disponible'
    }))
  
    return formattedRows;
  }
  
  async getTotalPageTaskByGroupId(connection, groupId, search) {
    const query = [
      'SELECT COUNT(*) AS total',
      'FROM tarea t',
      'INNER JOIN grupo_miembro gp ON t.grupo_miembro_id = gp.id_grupo_miembro',
      'INNER JOIN usuario u ON gp.usuario_tecnico_id = u.id_usuario',
      'INNER JOIN tipo_tarea tt ON t.tipo_tarea_id = tt.id_tipo_tarea',
      'WHERE gp.grupo_id = ? AND (tt.cod_ot LIKE ? OR tt.descripcion LIKE ? OR u.apellidos LIKE ?)',
    ].join('\n')
  
    const values = [groupId, `%${search}%`, `%${search}%`, `%${search}%`];
  
    const [ rows ] = await connection.query(query, values);
    return rows[0].total;
  }
  
  async getPaginatedTaskByGroupIdAndUserTechnicianId(connection, groupId, userTechnicianId, limit, offset, search) {
    const query = [
      'SELECT ',
      't.id_tarea, ' ,
      't.grupo_miembro_id,',
      't.tipo_tarea_id, ',
      'tt.cod_ot, ',
      'tt.descripcion, ',
      't.estado, ',
      't.fecha_inicio, ',
      't.fecha_fin, ',
      't.fecha_creacion, ',
      't.fecha_modificacion ',
      'FROM tarea t',
      'INNER JOIN grupo_miembro gp ON t.grupo_miembro_id = gp.id_grupo_miembro',
      'INNER JOIN usuario u ON gp.usuario_tecnico_id = u.id_usuario',
      'INNER JOIN tipo_tarea tt ON t.tipo_tarea_id = tt.id_tipo_tarea',
      'WHERE gp.grupo_id = ? AND gp.usuario_tecnico_id = ? AND (tt.descripcion LIKE ? OR tt.cod_ot LIKE ?)',
      'ORDER BY t.fecha_creacion',
      'LIMIT ? OFFSET ?'
    ].join('\n');
    console.log("groupId, userTechnicianId: ", groupId, " - ", userTechnicianId)
    const values = [groupId, userTechnicianId, `%${search}%`, `%${search}%`, Number(limit), Number(offset)]
    const [ rows ] = await connection.query(query, values);
  
    const formattedRows = rows.map(row => ({
      taskId: row.id_tarea,
      typetaskId: row.tipo_tarea_id,
      codOt: row.cod_ot,
      typeTask: row.descripcion,
      stateTask: row.estado,
      startTask: row.fecha_inicio ? format(new Date(row.fecha_inicio), 'dd-MM-yyyy HH:mm:ss') : '',
      endTask: row.fecha_fin ? format(new Date(row.fecha_fin), 'dd-MM-yyyy HH:mm:ss') : '',
      creationDate: row.fecha_creacion ? format(new Date(row.fecha_creacion), 'dd-MM-yyyy HH:mm:ss') : 'Fecha no disponible',
      modificationDate: row.fecha_modificacion ? format(new Date(row.fecha_modificacion), 'dd-MM-yyyy HH:mm:ss') : 'Fecha no disponible'
    }))
  
    return formattedRows;
  }
  
  async getTotalPageTaskByGroupIdAndUserTechnicianId(connection, groupId, userTechnicianId, search) {
    const query = [
      'SELECT COUNT(*) AS total',
      'FROM tarea t',
      'INNER JOIN grupo_miembro gp ON t.grupo_miembro_id = gp.id_grupo_miembro',
      'INNER JOIN usuario u ON gp.usuario_tecnico_id = u.id_usuario',
      'INNER JOIN tipo_tarea tt ON t.tipo_tarea_id = tt.id_tipo_tarea',
      'WHERE gp.grupo_id = ? AND gp.usuario_tecnico_id = ? AND (tt.descripcion LIKE ? OR tt.cod_ot LIKE ?)',
    ].join('\n')
  
    const values = [groupId, userTechnicianId, `%${search}%`, `%${search}%`];
  
    const [ rows ] = await connection.query(query, values);
    return rows[0].total;
  }

  async getTaskById (connection, taskId){
    const query = [
      'SELECT ',
      't.id_tarea, ' ,
      't.grupo_miembro_id, ' ,
      'u.nombres, ' ,
      'u.apellidos, ' ,
      'p.tipo_tarea_id, ',
      'tt.descripcion, ',
      't.fecha_creacion, ',
      't.fecha_modificacion ',
      'FROM tarea t',
      'INNER JOIN grupo_miembro gp ON t.grupo_miembro_id = gp.id_grupo_miembro',
      'INNER JOIN usuario u ON gp.usuario_tecnico_id = u.id_usuario',
      'INNER JOIN tipo_tarea tt ON t.tipo_tarea_id = p.id_tipo_tarea',
      'WHERE id_tarea = ? '
    ].join('\n')
  
    const values = [taskId]
  
    const [ rows ] = await connection.query(query, values);
  
    const formattedRows = rows.map(row => ({
      taskId: row.id_tarea,
      names: row.nombres,
      surnames: row.apellidos,
      typeStackId: row.tipo_tarea_id,
      typeStack: row.descripcion,
      stateTask: row.estado,
      creationDate: row.fecha_creacion ? format(new Date(row.fecha_creacion), 'dd-MM-yyyy HH:mm:ss') : 'Fecha no disponible',
      modificationDate: row.fecha_modificacion ? format(new Date(row.fecha_modificacion), 'dd-MM-yyyy HH:mm:ss') : 'Fecha no disponible'
    }))
  
    return formattedRows;
  }
  
  async createTask (connection, taskData){
    const {groupStaffId, typeTaskId } = taskData;
  
    const query = [
      'INSERT INTO',
      'tarea',
      '( grupo_miembro_id, ' ,
      'tipo_tarea_id, ',
      'estado) ',
      'VALUES (?, ?, 1)'
    ].join('\n')
  
    const values = [ groupStaffId, typeTaskId ]
  
    const result = await connection.query(query, values);
    return result;
  }
  
  async updateTask (connection, taskId, taskData){
    const { groupStaffId, typeStackId, state } = taskData;
    const values = [ groupStaffId, typeStackId, state, taskId ]
    
    const query = [
      'UPDATE tarea SET',
      'grupo_miembro_id = IFNULL(?, grupo_miembro_id), ' ,
      'tipo_tarea_id = IFNULL(?, tipo_tarea_id), ',
      'estado = IFNULL(?, estado) ',
      'WHERE id_personal = ?'
    ].join('\n');
    
    const result = connection.query(query, values);
    return result.rows;  
  }

  async deleteTask (connection, taskId){
    
    const query = [
      'DELETE FROM tarea',
      'WHERE id_tarea = ?',
    ].join('\n')
    
    const values = [taskId]
    const result = connection.query(query, values);
    return result.rows;  
  }
  
  
  async updateStartDateTask (connection, taskId){
    
    const query = [
      'UPDATE tarea SET',
      'fecha_inicio = NOW(), ' ,
      'estado = 2' ,
      'WHERE id_tarea = ?'
    ].join('\n');
    
    const values = [ taskId ]
    const result = connection.query(query, values);
    return result.rows;  
  }

  async updateEndDateTask (connection, taskId){
    
    const query = [
      'UPDATE tarea SET',
      'fecha_fin = NOW(), ' ,
      'estado = 3 ' ,
      'WHERE id_tarea = ?'
    ].join('\n');
    
    const values = [ taskId ]
    const result = connection.query(query, values);
    return result.rows;  
  }

}