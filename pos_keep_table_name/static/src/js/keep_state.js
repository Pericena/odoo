odoo.define('pos_keep_table_name.KeepState', function (require) {
    'use strict';

    const OrderCollection = require('pos_preparation_display.OrderCollection');
    const { patch } = require("@web/core/utils/patch");

    patch(OrderCollection.prototype, {
        get_order_state(order) {
            // Siempre mantener el estado 'Nueva' o el original si ya está en preparación
            return order.preparation_display_state || 'Nueva';
        },
    });
});