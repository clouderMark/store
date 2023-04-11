export enum EPath {
  Shop = '/shop',
  Login = '/login',
  Signup = '/signup',
  Product = '/shop/:id',
  Basket = '/basket',
  Checkout = '/checkout',
  Delivery = '/delivery',
  Contacts = '/contacts',
  NotFound = '*',
  Main = '/',
  User = '/user',
  UserOrders = '/user/orders',
  UserOrder = 'user/orders/:id',
  Admin = '/admin',
  AdminOrders = '/admin/orders',
  AdminOrder = '/admin/orders/:id',
  AdminIndustries = '/admin/industries',
  AdminSolutions = '/admin/solutions',
  AdminAreas = '/admin/areas',
  AdminProducts = '/admin/products',
  AdminMessages = '/admin/messages',
  AdminMessage = '/admin/messages/:id',
  AdminSubscriptions = '/admin/subscriptions',
  Industries = '/branches',
  IndustriesItem = '/branches/:id',
  BranchesSubItem = '/branches/:id/:role',
  AdminBranches = '/admin/branches',
  AdminSubIndustries = '/admin/subindustries',
  Areas = '/areas',
  Services = '/services',
  About = '/about',
  News = '/news',
}
