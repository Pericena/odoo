from odoo import models, fields, api

class PosOrder(models.Model):
    _inherit = 'pos.order'

    table = fields.Char(string="Mesa")
    customer_name = fields.Char(string="Nombre del Cliente")

    @api.model
    def _order_fields(self, ui_order):
        res = super()._order_fields(ui_order)
        res['table'] = ui_order.get('table', '')
        res['customer_name'] = ui_order.get('customer_name', '')
        return res

    def _get_pos_ui_data(self):
        res = super()._get_pos_ui_data()
        for order in res.get('orders', []):
            order['table'] = order.get('table', '')
            order['customer_name'] = order.get('customer_name', '')
        return res

    @api.model
    def create_from_ui(self, orders, draft=False):
        created_order_ids = []
        for ui_order in orders:
            table_name = ui_order.get('table', '')
            customer_name = ui_order.get('customer_name', '')

            existing_order = self.search([
                ('table', '=', table_name),
                ('state', 'in', ['draft', 'sent']),
            ], limit=1)

            if existing_order:
                for line in ui_order.get('lines', []):
                    self.env['pos.order.line'].create({
                        'order_id': existing_order.id,
                        'product_id': line[2]['product_id'],
                        'qty': line[2]['qty'],
                        'price_unit': line[2]['price_unit'],
                        'name': line[2].get('name', ''),
                        'note': line[2].get('note', ''),
                    })
                created_order_ids.append(existing_order.id)
            else:
                ids = super().create_from_ui([ui_order], draft)
                created_order_ids.extend(ids)
        return created_order_ids
