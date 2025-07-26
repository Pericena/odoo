odoo.define('pos_keep_table_name.KeepTableName', function(require) {
    'use strict';

    const Order = require('point_of_sale.models').Order;

    Order.extend({
        initialize(attributes, options) {
            this._super(...arguments);
            this.original_table_name = this.table || "";
            this.original_customer_name = this.customer_name || "";
            if (this.table) {
                this.name = this.table; 
            }
        },

        export_as_JSON() {
            const json = this._super(...arguments);
            json.table = this.original_table_name; 
            json.name = this.original_table_name;   
            return json;
        }
    });
});