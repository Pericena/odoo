odoo.define('pos_keep_table_name.KeepTableName', function (require) {
    'use strict';

    const Order = require('point_of_sale.models').Order;
    const { patch } = require("@web/core/utils/patch");

    patch(Order.prototype, {
        initialize() {
            this._super(...arguments);
            this.saved_customer_name = this.customer_name || this.table?.name || '';
            this.saved_table_name = this.table?.name || '';
        },

        export_as_JSON() {
            const json = this._super(...arguments);
            json.customer_name = this.saved_customer_name;
            json.table = this.saved_table_name;
            return json;
        },

        init_from_JSON(json) {
            this._super(...arguments);
            this.saved_customer_name = json.customer_name || '';
            this.saved_table_name = json.table || '';
            this.customer_name = this.saved_customer_name;

            if (this.pos.tables && this.saved_table_name) {
                const table = this.pos.tables.find(t => t.name === this.saved_table_name);
                if (table) {
                    this.table = table;
                }
            }
        },
    });
});
