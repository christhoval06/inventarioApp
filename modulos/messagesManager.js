/**
 * Created by cristobal on 05/28/14.
 */


exports.getMessage = function (key) {
    return {
        'c00': 'Error al Eliminar Categoria',
        'c01': "Categoria eliminada correctamente",
        'c02': "Categoria guardada correctamente",
        'c03': "Categoria actualizada correctamente",

        'p00': 'Error al Eliminar Producto',
        'p01': "Producto eliminado correctamente",
        'p02': "Producto guardado correctamente",
        'p03': "Producto actualizado correctamente",

        undefined: '',
        null: ''
    }[key];
}
