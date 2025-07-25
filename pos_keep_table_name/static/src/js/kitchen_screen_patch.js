odoo.define('pos_kitchen_keep_table.kitchen_screen_patch', function(require) {
    'use strict';

    const KitchenScreen = require('pos_preparation_display.KitchenScreen');
    const Registries = require('point_of_sale.Registries');

    const KitchenScreenPatch = (KitchenScreen) =>
        class extends KitchenScreen {
            _removeOrder(order) {
                if (order.is_paid) {
                    order.state = 'paid';
                    return;
                }
                super._removeOrder(order);
            }
        };

    Registries.Component.extend(KitchenScreen, KitchenScreenPatch);

    return KitchenScreen;
});
