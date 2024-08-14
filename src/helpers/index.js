export const insertarRegistro = async (items, modelo, asignarModel, foreignKey, foreignKeyValue,CreadoPor) => {
    const insertaRegistro = await Promise.all(
      items.map(async item => {
        return await modelo.create({
          ...item,
          CreadoPor: CreadoPor, // Asume que todos los modelos tienen el campo 'CreadoPor'
        });
      })
    );
  
    await Promise.all(
      insertaRegistro.map(async record => {
       
        await asignarModel.create({
          [foreignKey]: foreignKeyValue,
          [`${modelo.name}Id`]: record[`${modelo.name}Id`], // Asume que el nombre del modelo más 'Id' es la clave foránea
        });
      })
    );
  
    return insertaRegistro;
  };

