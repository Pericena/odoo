from odoo import models, fields

class PosOrder(models.Model):
    _inherit = 'pos.order'

    table = fields.Char(string="Mesa")  
    customer_name = fields.Char(string="Cliente")
    original_table_name = fields.Char(string="Nombre Original", copy=False)

    @api.model
    def _order_fields(self, ui_order):
        res = super()._order_fields(ui_order)
        table_name = str(ui_order.get('table', '')) if ui_order.get('table') else ''
        
        res['table'] = table_name
        res['original_table_name'] = table_name
        res['name'] = table_name 
        
        res['customer_name'] = str(ui_order.get('customer_name', '')) if ui_order.get('customer_name') else ''
        return res

    def _get_pos_ui_data(self):
        res = super()._get_pos_ui_data()
        for order in res.get('orders', []):
            if isinstance(order, dict):
                order['original_table_name'] = order.get('table', '') 
        return res