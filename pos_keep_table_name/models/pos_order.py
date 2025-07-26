from odoo import models, api
import logging

_logger = logging.getLogger(__name__)

class PosOrder(models.Model):
    _inherit = 'pos.order'
    
    @api.model
    def create(self, vals):
        _logger.info("CREATING PosOrder with values: %s", vals)
        return super(PosOrder, self).create(vals)

    def write(self, vals):
        _logger.info("UPDATING PosOrder ID %s with values: %s", self.ids, vals)
        return super(PosOrder, self).write(vals)

    def _get_pos_ui_data(self):
        res = super()._get_pos_ui_data()
        for order in res.get('orders', []):
            order['table'] = order.get('table', '')
            order['customer_name'] = order.get('customer_name', '')
        return res