odoo.define('pos_kitchen_keep_table.kitchen_screen_patch', function(require) {
    'use strict';

    const KitchenScreen = require('pos_preparation_display.KitchenScreen');
    const Registries = require('point_of_sale.Registries');

    const KitchenScreenPatch = (KitchenScreen) =>
        class extends KitchenScreen {

            _removeOrder(order) {
                if (order.is_internal_note) {
                    super._removeOrder(order);
                    return;
                }

                if (order.is_paid) {
                    order.state = 'paid';
                    
                
                    if (order.original_table_name) {
                        order.table = order.original_table_name;
                    }
                    return;
                }


                super._removeOrder(order);
            }
            _prepareOrderData(order) {
                const orderData = super._prepareOrderData(...arguments);
                
                if (order.original_table_name) {
                    orderData.table = order.original_table_name;
                    orderData.name = order.original_table_name; 
                }
                
                return orderData;
            }
        };

    Registries.Component.extend(KitchenScreen, KitchenScreenPatch);
    return KitchenScreen;
});