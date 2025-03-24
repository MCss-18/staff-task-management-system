export class CategoryDelayModel {

  async getCategoryDelay(connection){
      const query = [
        'SELECT ',
        'id_categoria_demora, ' ,
        'descripcion ' ,
        'FROM categoria_demora',
        'ORDER BY id_categoria_demora',
      ].join('\n')
    
      const [ rows ] = await connection.query(query);
    
      const formattedRows = rows.map(row => ({
        categoryDelayId: row.id_categoria_demora, 
        descripcionDelay: row.descripcion,
      }))
    
      return formattedRows;
    }

}