import sequelize from '../sequelize.js';
import database from 'sequelize';

const { DataTypes} = database

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'}
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketProduct = sequelize.define('basket_product', {
    quantity: {type: DataTypes.INTEGER, defaultValue: 1},
})

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.FLOAT, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    image: {type: DataTypes.STRING, allowNull: false},
    article: {type: DataTypes.INTEGER, unique: true, allowNull: false},
    weight: {type: DataTypes.FLOAT, allowNull: false},
})

const Industry = sequelize.define('industry', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.TEXT, unique: true, allowNull: false},
    cardImage: {type: DataTypes.STRING, allowNull: false},
    headerImage: {type: DataTypes.STRING, allowNull: false},
    title: {type: DataTypes.TEXT, allowNull: false},
    sliderImage: {type: DataTypes.STRING, allowNull: false},
})

const IndustryParagraph = sequelize.define('industry_paragraph', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.TEXT, allowNull: false}
})

const IndustryInfo = sequelize.define('ind_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.TEXT, allowNull: false},
    header: {type: DataTypes.TEXT, allowNull: false},
    listTitle: {type: DataTypes.TEXT, allowNull: false},
    image: {type: DataTypes.STRING, allowNull: false},
})

const IndustryListItem = sequelize.define('ind_list_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.TEXT, allowNull: false},
})

const IndustryInfoParagraph = sequelize.define('ind_paragraphs', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.TEXT, allowNull: false}
})

const IndustryOpinion = sequelize.define('ind_opinion', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.TEXT, allowNull: false},
    listTitle: {type: DataTypes.TEXT, allowNull: false},
    name: {type: DataTypes.TEXT, allowNull: false},
    image: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: false},
    fax: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
})

const IndustryOpinionParagraph = sequelize.define('ind_op_paragraphs', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.TEXT, allowNull: false}
})

const IndustryOpinionItem = sequelize.define('ind_op_list_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.TEXT, allowNull: false},
})

const SubIndustry = sequelize.define('subindustry', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.TEXT, unique: true, allowNull: false},
    cardImage: {type: DataTypes.STRING, allowNull: false},
    headerImage: {type: DataTypes.STRING, allowNull: false},
    title: {type: DataTypes.TEXT, allowNull: false},
})

const SubIndustryParagraph = sequelize.define('subindustry_paragraph', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.TEXT, allowNull: false}
})

const SubInfo = sequelize.define('sub_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.TEXT, allowNull: false},
    header: {type: DataTypes.TEXT, allowNull: false},
    listTitle: {type: DataTypes.TEXT, allowNull: false},
    image: {type: DataTypes.STRING, allowNull: false},
})

const SubListItem = sequelize.define('sub_list_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.TEXT, allowNull: false},
})

const SubInfoParagraph = sequelize.define('sub_paragraphs', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.TEXT, allowNull: false}
})

const SubOpinion = sequelize.define('sub_opinion', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.TEXT, allowNull: false},
    listTitle: {type: DataTypes.TEXT, allowNull: false},
    name: {type: DataTypes.TEXT, allowNull: false},
    image: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: false},
    fax: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
})

const SubOpinionParagraph = sequelize.define('sub_op_paragraphs', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.TEXT, allowNull: false}
})

const SubOpinionItem = sequelize.define('sub_op_list_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.TEXT, allowNull: false},
})

const Solution = sequelize.define('solution', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.TEXT, unique: true, allowNull: false},
    cardImage: {type: DataTypes.STRING, allowNull: false},
    headerImage: {type: DataTypes.STRING, allowNull: false},
    title: {type: DataTypes.TEXT, allowNull: false},
}, { timestamps: false })

const SolutionParagraph = sequelize.define('solution_paragraph', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.TEXT, allowNull: false}
}, { timestamps: false })

const SolutionInfoImage = sequelize.define('solution_info_image', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    image: {type: DataTypes.STRING, allowNull: false},
    relatedTo: {type: DataTypes.STRING, allowNull: false},
},  { timestamps: false })

const SolutionInfoParagraph = sequelize.define('solution_info_paragraph', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    relatedTo: {type: DataTypes.TEXT, allowNull: false},
    value: {type: DataTypes.TEXT, allowNull: false},
}, { timestamps: false })

const SolutionInfoTitle = sequelize.define('solution_info_title', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    unique: {type: DataTypes.TEXT, allowNull: false},
    value: {type: DataTypes.TEXT, allowNull: false},
}, { timestamps: false })

const SolutionOpinion = sequelize.define('solution_opinion', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.TEXT, allowNull: false},
    listTitle: {type: DataTypes.TEXT, allowNull: false},
    name: {type: DataTypes.TEXT, allowNull: false},
    image: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: false},
    fax: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
}, { timestamps: false })

const SolutionOpinionParagraph = sequelize.define('solution_op_paragraphs', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.TEXT, allowNull: false}
}, { timestamps: false })

const SolutionOpinionItem = sequelize.define('solution_op_list_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.TEXT, allowNull: false},
}, { timestamps: false })

const Area = sequelize.define('area', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.TEXT, unique: true, allowNull: false},
})

const Rating = sequelize.define('rating', {
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

const ProductProp = sequelize.define('product_prop', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: { type: DataTypes.TEXT, allowNull: false},
    value: {type: DataTypes.TEXT, allowNull: false}
})

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.TEXT, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: false},
    address: {type: DataTypes.TEXT, allowNull: false},
    amount: {type: DataTypes.INTEGER, allowNull: false},
    status: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    comment: {type: DataTypes.TEXT},
    prettyCreatedAt: {
        type: DataTypes.VIRTUAL,
        get() {
            const value = this.getDataValue('createdAt')
            const day = value.getDate()
            const month = value.getMonth()
            const year = value.getFullYear()
            const hours = value.getHours()
            const minutes = value.getMinutes()
            return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes
        }
    },
    prettyUpdatedAt: {
        type: DataTypes.VIRTUAL,
        get() {
            const value = this.getDataValue('updatedAt')
            const day = value.getDate()
            const month = value.getMonth() + 1
            const year = value.getFullYear()
            const hours = value.getHours()
            const minutes = value.getMinutes()
            return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes
        }
    },
})

const OrderItem = sequelize.define('order_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.TEXT, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    quantity: {type: DataTypes.INTEGER, allowNull: false},
    image: {type: DataTypes.STRING, allowNull: false},
})

const Message = sequelize.define('message', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    company: {type: DataTypes.TEXT, allowNull: false},
    name: {type: DataTypes.TEXT, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: false},
    question: {type: DataTypes.TEXT, allowNull: false},
    type: {type: DataTypes.STRING, allowNull: false},
})

const Subscription = sequelize.define('subscription', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, allowNull: false},
})

Basket.belongsToMany(Product, {through: BasketProduct, onDelete: 'CASCADE'})
Product.belongsToMany(Basket, {through: BasketProduct, onDelete: 'CASCADE'})

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)
Product.hasMany(BasketProduct)
BasketProduct.belongsTo(Product)

Industry.hasMany(Product, {onDelete: 'RESTRICT'})
Product.belongsTo(Industry)

Industry.hasMany(IndustryParagraph, {as: 'paragraphs', onDelete: 'CASCADE'})
IndustryParagraph.belongsTo(Industry);

Industry.hasMany(SubIndustry, {as: 'subindustries', onDelete: 'CASCADE'})
SubIndustry.belongsTo(Industry)

SubIndustry.hasMany(SubIndustryParagraph, {as: 'paragraphs', onDelete: 'CASCADE'})
SubIndustryParagraph.belongsTo(SubIndustry);


Solution.hasMany(Product, {onDelete: 'RESTRICT'})
Product.belongsTo(Solution)

Solution.hasMany(SolutionParagraph, {as: 'paragraphs', onDelete: 'CASCADE'})
SolutionParagraph.belongsTo(Solution);

Solution.hasMany(SolutionInfoImage, {as: 'infoImages', onDelete: 'CASCADE'})
SolutionInfoImage.belongsTo(Solution)

Solution.hasMany(SolutionInfoParagraph, {as: 'infoParagraphs', onDelete: 'CASCADE'})
SolutionInfoParagraph.belongsTo(Solution)

Solution.hasMany(SolutionInfoTitle, {as: 'infoTitle', onDelete: 'CASCADE'})
SolutionInfoTitle.belongsTo(Solution)

Solution.hasOne(SolutionOpinion, {as: 'opinion', onDelete: 'CASCADE'},);
SolutionOpinion.belongsTo(Solution);
SolutionOpinion.hasMany(SolutionOpinionParagraph, {as: 'paragraphs', onDelete: 'CASCADE'},);
SolutionOpinionParagraph.belongsTo(SolutionOpinion);
SolutionOpinion.hasMany(SolutionOpinionItem, {as: 'listItems', onDelete: 'CASCADE'},);
SolutionOpinionItem.belongsTo(SolutionOpinion);

Area.hasMany(Product, {onDelete: 'RESTRICT'})
Product.belongsTo(Area)

Product.belongsToMany(User, {through: Rating, onDelete: 'CASCADE'})
User.belongsToMany(Product, {through: Rating, onDelete: 'CASCADE'})

Product.hasMany(Rating)
Rating.belongsTo(Product)
User.hasMany(Rating)
Rating.belongsTo(User)

Product.hasMany(ProductProp, {as: 'props', onDelete: 'CASCADE'})
ProductProp.belongsTo(Product)

Order.hasMany(OrderItem, {as: 'items', onDelete: 'CASCADE'})
OrderItem.belongsTo(Order)

User.hasMany(Order, {as: 'orders', onDelete: 'SET NULL'})
Order.belongsTo(User)

SubIndustry.hasOne(SubInfo, {as: 'info', onDelete: 'CASCADE',})
SubInfo.belongsTo(SubIndustry)
SubInfo.hasMany(SubListItem, {as: 'listItems', onDelete: 'CASCADE',})
SubListItem.belongsTo(SubInfo)
SubInfo.hasMany(SubInfoParagraph, {as: 'paragraphs', onDelete: 'CASCADE',})
SubInfoParagraph.belongsTo(SubInfo)

Industry.hasOne(IndustryInfo, {as: 'info', onDelete: 'CASCADE',})
IndustryInfo.belongsTo(Industry);
IndustryInfo.hasMany(IndustryListItem, {as: 'listItems', onDelete: 'CASCADE',})
IndustryListItem.belongsTo(IndustryInfo)
IndustryInfo.hasMany(IndustryInfoParagraph, {as: 'paragraphs', onDelete: 'CASCADE',})
IndustryInfoParagraph.belongsTo(IndustryInfo)

Industry.hasOne(IndustryOpinion, {as: 'opinion', onDelete: 'CASCADE'},);
IndustryOpinion.belongsTo(Industry);
IndustryOpinion.hasMany(IndustryOpinionParagraph, {as: 'paragraphs', onDelete: 'CASCADE'});
IndustryOpinionParagraph.belongsTo(IndustryOpinion);
IndustryOpinion.hasMany(IndustryOpinionItem, {as: 'listItems', onDelete: 'CASCADE'});
IndustryOpinionItem.belongsTo(IndustryOpinion);

SubIndustry.hasOne(SubOpinion, {as: 'opinion', onDelete: 'CASCADE'},);
SubOpinion.belongsTo(SubIndustry);
SubOpinion.hasMany(SubOpinionParagraph, {as: 'paragraphs', onDelete: 'CASCADE'});
SubOpinionParagraph.belongsTo(SubOpinion);
SubOpinion.hasMany(SubOpinionItem, {as: 'listItems', onDelete: 'CASCADE'});
SubOpinionItem.belongsTo(SubOpinion);

export {
    User,
    Basket,
    Product,
    Industry,
    IndustryParagraph,
    SubIndustry,
    SubIndustryParagraph,
    Solution,
    SolutionParagraph,
    SolutionInfoImage,
    SolutionInfoParagraph,
    SolutionInfoTitle,
    SolutionOpinion,
    SolutionOpinionParagraph,
    SolutionOpinionItem,
    Area,
    Rating,
    BasketProduct,
    ProductProp,
    Order,
    OrderItem,
    Message,
    Subscription,
    SubInfo,
    SubListItem,
    SubInfoParagraph,
    IndustryInfo,
    IndustryListItem,
    IndustryInfoParagraph,
    IndustryOpinion,
    IndustryOpinionItem,
    IndustryOpinionParagraph,
    SubOpinion,
    SubOpinionItem,
    SubOpinionParagraph,
}
