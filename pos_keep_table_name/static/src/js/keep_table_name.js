odoo.define('pos_keep_table_name.KeepTableName', function (require) {
    'use strict';

    const Order = require('point_of_sale.models').Order;

    const super_init = Order.prototype.initialize;
    Order.prototype.initialize = function (attributes, options) {
        super_init.call(this, attributes, options);
        this.saved_customer_name = this.table?.name || this.customer_name || "";
        this.saved_table_name = this.table?.name || "";
    };

    const super_export_as_JSON = Order.prototype.export_as_JSON;
    Order.prototype.export_as_JSON = function () {
        const json = super_export_as_JSON.call(this);
        json.customer_name = this.saved_customer_name;
        json.table = this.saved_table_name;
        return json;
    };

    const super_init_from_JSON = Order.prototype.init_from_JSON;
    Order.prototype.init_from_JSON = function (json) {
        super_init_from_JSON.call(this, json);
        this.saved_customer_name = json.customer_name || "";
        this.saved_table_name = json.table || "";
    };
});
