odoo.define('pos_keep_table_name.KeepState', function(require) {
    'use strict';

    const { patch } = require('web.utils');
    const OrderCollection = require('pos_preparation_display.OrderCollection');

    patch(OrderCollection.prototype, {
        get_order_state(order) {
            let state = order.preparation_display_state || 'Nueva';
            if (order.is_internal_note) return 'Nota Interna';
            if (order.original_table_name) return `${state} (${order.original_table_name})`;
            return state;
        },

        _groupOrdersByState(orders) {
            const grouped = this._super(...arguments);
            // Agrupar por mesa dentro de cada estado
            Object.keys(grouped).forEach(state => {
                const ordersByTable = {};
                grouped[state].forEach(order => {
                    const table = order.original_table_name || 'Sin Mesa';
                    if (!ordersByTable[table]) ordersByTable[table] = [];
                    ordersByTable[table].push(order);
                });
                grouped[state] = ordersByTable;
            });
            return grouped;
        }
    });
});