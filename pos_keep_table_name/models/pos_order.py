from odoo import models, fields, api

class PosOrder(models.Model):
    _inherit = 'pos.order'

    table = fields.Char(string="Mesa")
    customer_name = fields.Char(string="Nombre del Cliente")

    @api.model
    def _order_fields(self, ui_order):
        res = super()._order_fields(ui_order)
        res['table'] = str(ui_order.get('table', '')) if ui_order.get('table') else ''
        res['customer_name'] = str(ui_order.get('customer_name', '')) if ui_order.get('customer_name') else ''
        return res

    def _get_pos_ui_data(self):
        res = super()._get_pos_ui_data()
        orders = res.get('orders', [])
        if isinstance(orders, list):
            for order in orders:
                if isinstance(order, dict):
                    order['table'] = order.get('table', '')
                    order['customer_name'] = order.get('customer_name', '')
        return res
