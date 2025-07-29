from odoo import models, api
import logging

_logger = logging.getLogger(__name__)

class PosOrder(models.Model):
    _inherit = 'pos.order'
    
    @api.model
    def create(self, vals):
        # _logger.info("CREATING PosOrder with values: %s", vals)
        return super(PosOrder, self).create(vals)

    def write(self, vals):
        #_logger.info("UPDATING PosOrder ID %s with values: %s", self.ids, vals)
        vals_copy = vals.copy()
        if 'table_stand_number' in vals:
            for order in self:
                if order.pos_reference and 'Kiosk' in order.pos_reference:
                    vals_copy.pop('table_stand_number')
                    return super(PosOrder, order).write(vals_copy)
        return super(PosOrder, self).write(vals_copy)

    def _get_pos_ui_data(self):
        res = super()._get_pos_ui_data()
        for order in res.get('orders', []):
            order['table'] = order.get('table', '')
            order['customer_name'] = order.get('customer_name', '')
        return res
      
class PosOrderLine(models.Model):
    _inherit = 'pos.order.line'
    
    @api.model
    def create(self, vals):
        _logger.info("CREATING PosOrderLine with values: %s", vals)
        return super(PosOrderLine, self).create(vals)
      
    @api.model
    def write(self, vals):
        _logger.info("UPDATE PosOrderLine with values: %s", vals)
        return super(PosOrderLine, self).write(vals)