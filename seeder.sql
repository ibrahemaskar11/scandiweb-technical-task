USE scandiweb_fullstack_task;

-- CATEGORIES

INSERT INTO categories (name) VALUES
    ('all'),
    ('clothes'),
    ('tech');

-- CURRENCIES
INSERT INTO currencies (label, symbol) VALUES
    ('USD', '$');

-- PRODUCTS

INSERT INTO products (id, name, description, category, brand, inStock, gallery) VALUES
    ('huarache-x-stussy-le', 'Nike Air Huarache Le', '<p>Great sneakers for everyday use!</p>', 'clothes', 'Nike x Stussy', TRUE, '[
        "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087",
        "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087",
        "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087",
        "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087",
        "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087"
    ]'),
    
    ('jacket-canada-goosee', 'Jacket', '<p>Awesome winter jacket</p>', 'clothes', 'Canada Goose', TRUE, '[
        "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg",
        "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016107/product-image/2409L_61_a.jpg",
        "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg",
        "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016109/product-image/2409L_61_c.jpg",
        "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016110/product-image/2409L_61_d.jpg",
        "https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058169/product-image/2409L_61_o.png",
        "https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058159/product-image/2409L_61_p.png"
    ]'),
    
    ('ps-5', 'PlayStation 5', '<p>A good gaming console. Plays games of PS4! Enjoy if you can buy it mwahahahaha</p>', 'tech', 'Sony', TRUE, '[
        "https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/610%2B69ZsKCL._SL1500_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/51iPoFwQT3L._SL1230_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/61qbqFcvoNL._SL1500_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/51HCjA3rqYL._SL1230_.jpg"
    ]'),
    
    ('xbox-series-s', 'Xbox Series S 512GB', '<div>
        <ul>
            <li><span>Hardware-beschleunigtes Raytracing macht dein Spiel noch realistischer</span></li>
            <li><span>Spiele Games mit bis zu 120 Bilder pro Sekunde</span></li>
            <li><span>Minimiere Ladezeiten mit einer speziell entwickelten 512GB NVMe SSD und wechsle mit Quick Resume nahtlos zwischen mehreren Spielen.</span></li>
            <li><span>Xbox Smart Delivery stellt sicher, dass du die beste Version deines Spiels spielst, egal, auf welcher Konsole du spielst</span></li>
            <li><span>Spiele deine Xbox One-Spiele auf deiner Xbox Series S weiter. Deine Fortschritte, Erfolge und Freundesliste werden automatisch auf das neue System übertragen.</span></li>
            <li><span>Erwecke deine Spiele und Filme mit innovativem 3D Raumklang zum Leben</span></li>
            <li><span>Der brandneue Xbox Wireless Controller zeichnet sich durch höchste Präzision, eine neue Share-Taste und verbesserte Ergonomie aus</span></li>
            <li><span>Ultra-niedrige Latenz verbessert die Reaktionszeit von Controller zum Fernseher</span></li>
            <li><span>Verwende dein Xbox One-Gaming-Zubehör -einschließlich Controller, Headsets und mehr</span></li>
            <li><span>Erweitere deinen Speicher mit der Seagate 1 TB-Erweiterungskarte für Xbox Series X (separat erhältlich) und streame 4K-Videos von Disney+, Netflix, Amazon, Microsoft Movies &amp; TV und mehr</span></li>
        </ul>
    </div>', 'tech', 'Microsoft', FALSE, '[
        "https://images-na.ssl-images-amazon.com/images/I/71vPCX0bS-L._SL1500_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/71q7JTbRTpL._SL1500_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/71iQ4HGHtsL._SL1500_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/61IYrCrBzxL._SL1500_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/61RnXmpAmIL._SL1500_.jpg"
    ]'),
    
    ('apple-imac-2021', 'iMac 2021', 'The new iMac!', 'tech', 'Apple', TRUE, '[
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-selection-hero-202104?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1617492405000"
    ]'),
    
    ('apple-iphone-12-pro', 'iPhone 12 Pro', 'This is iPhone 12. Nothing else to say.', 'tech', 'Apple', TRUE, '[
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-family-hero?wid=940&hei=1112&fmt=jpeg&qlt=80&.v=1604021663000"
    ]'),
    
    ('apple-airpods-pro', 'AirPods Pro', '
<h3>Magic like you’ve never heard</h3>
<p>AirPods Pro have been designed to deliver Active Noise Cancellation for immersive sound, Transparency mode so you can hear your surroundings, and a customizable fit for all-day comfort. Just like AirPods, AirPods Pro connect magically to your iPhone or Apple Watch. And they’re ready to use right out of the case.</p>

<h3>Active Noise Cancellation</h3>
<p>Incredibly light noise-cancelling headphones, AirPods Pro block out your environment so you can focus on what you’re listening to. AirPods Pro use two microphones, an outward-facing microphone and an inward-facing microphone, to create superior noise cancellation. By continuously adapting to the geometry of your ear and the fit of the ear tips, Active Noise Cancellation silences the world to keep you fully tuned in to your music, podcasts, and calls.</p>

<h3>Transparency mode</h3>
<p>Switch to Transparency mode and AirPods Pro let the outside sound in, allowing you to hear and connect to your surroundings. Outward- and inward-facing microphones enable AirPods Pro to undo the sound-isolating effect of the silicone tips so things sound and feel natural, like when you’re talking to people around you.</p>

<h3>All-new design</h3>
<p>AirPods Pro offer a more customizable fit with three sizes of flexible silicone tips to choose from. With an internal taper, they conform to the shape of your ear, securing your AirPods Pro in place and creating an exceptional seal for superior noise cancellation.</p>

<h3>Amazing audio quality</h3>
<p>A custom-built high-excursion, low-distortion driver delivers powerful bass. A superefficient high dynamic range amplifier produces pure, incredibly clear sound while also extending battery life. And Adaptive EQ automatically tunes music to suit the shape of your ear for a rich, consistent listening experience.</p>

<h3>Even more magical</h3>
<p>The Apple-designed H1 chip delivers incredibly low audio latency. A force sensor on the stem makes it easy to control music and calls and switch between Active Noise Cancellation and Transparency mode. Announce Messages with Siri gives you the option to have Siri read your messages through your AirPods. And with Audio Sharing, you and a friend can share the same audio stream on two sets of AirPods — so you can play a game, watch a movie, or listen to a song together.</p>
', 'tech', 'Apple', FALSE, '[
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWP22?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1591634795000"
    ]'),
    
    ('apple-airtag', 'AirTag', '
<h1>Lose your knack for losing things.</h1>
<p>AirTag is an easy way to keep track of your stuff. Attach one to your keys, slip another one in your backpack. And just like that, they’re on your radar in the Find My app. AirTag has your back.</p>
', 'tech', 'Apple', TRUE, '[
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-double-select-202104?wid=445&hei=370&fmt=jpeg&qlt=95&.v=1617761672000"
    ]');

-- ATTRIBUTES

INSERT INTO attributes (id, name, type) VALUES
    ('Size', 'Size', 'text'),
    ('Color', 'Color', 'swatch'),
    ('Capacity', 'Capacity', 'text'),
    ('With USB 3 ports', 'With USB 3 ports', 'text'),
    ('Touch ID in keyboard', 'Touch ID in keyboard', 'text');

-- PRODUCT ATTRIBUTES

INSERT INTO product_attributes (id, displayValue, value, product_id, attribute_id) VALUES
    -- Product: huarache-x-stussy-le
    ('huarache-x-stussy-le_Size_40', '40', '40', 'huarache-x-stussy-le', 'Size'),
    ('huarache-x-stussy-le_Size_41', '41', '41', 'huarache-x-stussy-le', 'Size'),
    ('huarache-x-stussy-le_Size_42', '42', '42', 'huarache-x-stussy-le', 'Size'),
    ('huarache-x-stussy-le_Size_43', '43', '43', 'huarache-x-stussy-le', 'Size'),

    -- Product: jacket-canada-goosee
    ('jacket-canada-goosee_Size_S', 'Small', 'S', 'jacket-canada-goosee', 'Size'),
    ('jacket-canada-goosee_Size_M', 'Medium', 'M', 'jacket-canada-goosee', 'Size'),
    ('jacket-canada-goosee_Size_L', 'Large', 'L', 'jacket-canada-goosee', 'Size'),
    ('jacket-canada-goosee_Size_XL', 'Extra Large', 'XL', 'jacket-canada-goosee', 'Size'),

    -- Product: ps-5
    ('ps-5_Color_Green', 'Green', '#44FF03', 'ps-5', 'Color'),
    ('ps-5_Color_Cyan', 'Cyan', '#03FFF7', 'ps-5', 'Color'),
    ('ps-5_Color_Blue', 'Blue', '#030BFF', 'ps-5', 'Color'),
    ('ps-5_Color_Black', 'Black', '#000000', 'ps-5', 'Color'),
    ('ps-5_Color_White', 'White', '#FFFFFF', 'ps-5', 'Color'),
    ('ps-5_Capacity_512G', '512G', '512G', 'ps-5', 'Capacity'),
    ('ps-5_Capacity_1T', '1T', '1T', 'ps-5', 'Capacity'),

    -- Product: xbox-series-s
    ('xbox-series-s_Color_Green', 'Green', '#44FF03', 'xbox-series-s', 'Color'),
    ('xbox-series-s_Color_Cyan', 'Cyan', '#03FFF7', 'xbox-series-s', 'Color'),
    ('xbox-series-s_Color_Blue', 'Blue', '#030BFF', 'xbox-series-s', 'Color'),
    ('xbox-series-s_Color_Black', 'Black', '#000000', 'xbox-series-s', 'Color'),
    ('xbox-series-s_Color_White', 'White', '#FFFFFF', 'xbox-series-s', 'Color'),
    ('xbox-series-s_Capacity_512G', '512G', '512G', 'xbox-series-s', 'Capacity'),
    ('xbox-series-s_Capacity_1T', '1T', '1T', 'xbox-series-s', 'Capacity'),

    -- Product: apple-imac-2021
    ('apple-imac-2021_Capacity_256GB', '256GB', '256GB', 'apple-imac-2021', 'Capacity'),
    ('apple-imac-2021_Capacity_512GB', '512GB', '512GB', 'apple-imac-2021', 'Capacity'),
    ('apple-imac-2021_With USB 3 ports_Yes', 'Yes', 'Yes', 'apple-imac-2021', 'With USB 3 ports'),
    ('apple-imac-2021_With USB 3 ports_No', 'No', 'No', 'apple-imac-2021', 'With USB 3 ports'),
    ('apple-imac-2021_Touch ID in keyboard_Yes', 'Yes', 'Yes', 'apple-imac-2021', 'Touch ID in keyboard'),
    ('apple-imac-2021_Touch ID in keyboard_No', 'No', 'No', 'apple-imac-2021', 'Touch ID in keyboard'),

    -- Product: apple-iphone-12-pro
    ('apple-iphone-12-pro_Capacity_512G', '512G', '512G', 'apple-iphone-12-pro', 'Capacity'),
    ('apple-iphone-12-pro_Capacity_1T', '1T', '1T', 'apple-iphone-12-pro', 'Capacity'),
    ('apple-iphone-12-pro_Color_Green', 'Green', '#44FF03', 'apple-iphone-12-pro', 'Color'),
    ('apple-iphone-12-pro_Color_Cyan', 'Cyan', '#03FFF7', 'apple-iphone-12-pro', 'Color'),
    ('apple-iphone-12-pro_Color_Blue', 'Blue', '#030BFF', 'apple-iphone-12-pro', 'Color'),
    ('apple-iphone-12-pro_Color_Black', 'Black', '#000000', 'apple-iphone-12-pro', 'Color'),
    ('apple-iphone-12-pro_Color_White', 'White', '#FFFFFF', 'apple-iphone-12-pro', 'Color');

-- PRODUCTS PRICES

INSERT INTO prices (product_id, currency_id, amount) VALUES
    ('huarache-x-stussy-le', 'USD', 144.69),
    ('jacket-canada-goosee', 'USD', 518.47),
    ('ps-5', 'USD', 844.02),
    ('xbox-series-s', 'USD', 333.99),
    ('apple-imac-2021', 'USD', 1688.03),
    ('apple-iphone-12-pro', 'USD', 1000.76),
    ('apple-airpods-pro', 'USD', 300.23),
    ('apple-airtag', 'USD', 120.57);
