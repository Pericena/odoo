{
    'name': 'POS Kitchen Keep Table Name',
    'version': '1.0',
    'depends': ['point_of_sale', 'pos_preparation_display'],
    'author': 'Luishiño',
    'category': 'Point of Sale',
    'description': 'Evita que se borre el número de mesa de la pantalla de cocina después del pago.',
    'data': [
        #  'views/assets.xml',
    ],
    'assets': {
        'point_of_sale.assets': [
            'pos_keep_table_name/static/src/js/KeepTableName.js',
            'pos_keep_table_name/static/src/js/KeepState.js',
            'pos_keep_table_name/static/src/js/pos_keep_table_name.js'
        ],
    },
    'installable': True,
    'auto_install': False,
    'license': 'LGPL-3',
}
