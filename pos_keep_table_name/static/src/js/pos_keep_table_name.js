odoo.define('pos_keep_table_name.main', function(require) {
    'use strict';

    const models = require('point_of_sale.models');

    models.PosModel = models.PosModel.extend({
        push_order(order) {
            if (!order.is_internal_note && order.table) {
                const existing = this.get_order_list().find(
                    o => o.table === order.table && !o.is_internal_note
                );
                if (existing) {
                    console.warn('Orden duplicada rechazada para mesa', order.table);
                    return false;
                }
            }
            return this._super(...arguments);
        },

        transfer_order_to_other_table(order, table) {
            this._super(...arguments);
            order.original_table_name = table;  
            order.name = table;  
        }
    });

    const OrderReceipt = require('point_of_sale.OrderReceipt');
    const Registries = require('point_of_sale.Registries');

    Registries.Component.extend(OrderReceipt, {
        getTableName() {
            return this.props.order.original_table_name || '';
        }
    });
});