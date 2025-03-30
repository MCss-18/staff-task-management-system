import { format } from "date-fns";

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
      'td.hora_fin, ',
      'td.fecha_creacion ',

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
      endTime: row.hora_fin,
      creationDate: row.fecha_creacion ? format(new Date(row.fecha_creacion), 'dd-MM-yyyy HH:mm:ss') : 'Fecha no disponible',
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

  async deleteTaskDelay (connection, taskId){
    const values = [ taskId]
    
    const query = [
      'DELETE FROM tarea_demora',
      'WHERE tarea_id = ?',
    ].join('\n')
    
    const result = connection.query(query, values);
    return result.rows;  
  }
  
  async getTaskDelayByGroupAndUser (connection, groupStaffId) {
    const query = `
      SELECT 
        td.id_tarea_demora, 
        td.tarea_id,
        g.descripcion as nombre_grupo, 
        tt.cod_ot, 
        tt.descripcion AS tarea_nombre, 
        t.estado, 
        cd.codigo, 
        cd.descripcion AS categoria_demora, 
        td.fecha, 
        td.hora_inicio, 
        td.hora_fin, 
        td.observacion
      FROM tarea_demora td
      LEFT JOIN categoria_demora cd ON td.categoria_demora_id = cd.id_categoria_demora
      LEFT JOIN tarea t ON td.tarea_id = t.id_tarea
      LEFT JOIN tipo_tarea tt ON t.tipo_tarea_id = tt.id_tipo_tarea
      LEFT JOIN grupo_miembro gm ON t.grupo_miembro_id = gm.id_grupo_miembro
      LEFT JOIN grupo g ON gm.grupo_id = g.id_grupo
      WHERE t.grupo_miembro_id = ?
      ORDER BY t.fecha_creacion, td.fecha_creacion;
    `;
  
    const values = [groupStaffId]
    const [ rows ] = await connection.query(query, values)
    
    const estadoMap = {
      1: "No iniciado",
      2: "En proceso",
      3: "Finalizado",
    };

    const formattedRows = rows.map(row => ({
      nombreGrupo: row.nombre_grupo,
      codigoOt: row.cod_ot,
      descripcionTarea: row.tarea_nombre,
      estadoTarea: estadoMap[row.estado] || "Estado desconocido",
      codigoDemora: row.codigo,
      descripcionDemora: row.categoria_demora,
      horaInicioDemora: row.hora_inicio,
      horaFinDemora: row.hora_fin,
      categoriaDemora: row.descripcion,
      observacionDemora: row.observacion,
    }))
    return formattedRows;
  }

  async getTaskDelayByGroup (connection, groupId) {
    const query = `
      SELECT 
        td.id_tarea_demora, 
        g.descripcion as nombre_grupo, 
        u.nombres as nombres_inspector,
        u.apellidos as apellidos_inspector,
        td.tarea_id,
        tt.cod_ot, 
        tt.descripcion AS tarea_nombre, 
        t.estado, 
        cd.codigo, 
        cd.descripcion AS categoria_demora, 
        td.fecha, 
        td.hora_inicio, 
        td.hora_fin, 
        td.observacion
      FROM tarea_demora td
      LEFT JOIN categoria_demora cd ON td.categoria_demora_id = cd.id_categoria_demora
      LEFT JOIN tarea t ON td.tarea_id = t.id_tarea
      LEFT JOIN tipo_tarea tt ON t.tipo_tarea_id = tt.id_tipo_tarea
      LEFT JOIN grupo_miembro gm ON t.grupo_miembro_id = gm.id_grupo_miembro
      LEFT JOIN usuario u ON gm.usuario_tecnico_id = u.id_usuario
      LEFT JOIN grupo g ON gm.grupo_id = g.id_grupo
      WHERE g.id_grupo = ?
      ORDER BY t.fecha_creacion, td.fecha_creacion
    `;
  
    const values = [ groupId ]
    const [ rows ] = await connection.query(query, values)
    
    const estadoMap = {
      1: "No iniciado",
      2: "En proceso",
      3: "Finalizado",
    };

    const formattedRows = rows.map(row => ({
      nombreGrupo: row.nombre_grupo,
      nombresInspector: row.nombres_inspector,
      apellidosInspector: row.apellidos_inspector,
      codigoOt: row.cod_ot,
      descripcionTarea: row.tarea_nombre,
      estadoTarea: estadoMap[row.estado] || "Estado desconocido",
      codigoDemora: row.codigo,
      descripcionDemora: row.categoria_demora,
      horaInicioDemora: row.hora_inicio,
      horaFinDemora: row.hora_fin,
      categoriaDemora: row.descripcion,
      observacionDemora: row.observacion,
    }))
    return formattedRows;
  }

}