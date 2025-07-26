odoo.define('pos_kitchen_keep_table.kitchen_screen_patch', function(require) {
    'use strict';

    const KitchenScreen = require('pos_preparation_display.KitchenScreen');
    const Registries = require('point_of_sale.Registries');

    const KitchenScreenPatch = (KitchenScreen) =>
        class extends KitchenScreen {
            /**
             * Modificación clave:
             * - Respeta el nombre original de la mesa (T04, T05) al eliminar órdenes.
             * - Maneja notas internas y órdenes pagadas correctamente.
             */
            _removeOrder(order) {
                // 1. Si es una nota interna, eliminarla normalmente
                if (order.is_internal_note) {
                    super._removeOrder(order);
                    return;
                }

                // 2. Si está pagada, marcarla como 'paid' pero mantenerla en la vista
                if (order.is_paid) {
                    order.state = 'paid';
                    
                    // Forzar actualización del nombre de mesa (evitar "ENTRA #401")
                    if (order.original_table_name) {
                        order.table = order.original_table_name;
                    }
                    return;
                }

                // 3. Orden no pagada: eliminación estándar
                super._removeOrder(order);
            }

            /**
             * Extendemos para agrupar órdenes por mesa físicamente (T04, T05)
             */
            _prepareOrderData(order) {
                const orderData = super._prepareOrderData(...arguments);
                
                // Asegurar que la cocina vea el nombre correcto de la mesa
                if (order.original_table_name) {
                    orderData.table = order.original_table_name;
                    orderData.name = order.original_table_name; // Eliminar "ENTRA"
                }
                
                return orderData;
            }
        };

    Registries.Component.extend(KitchenScreen, KitchenScreenPatch);
    return KitchenScreen;
});