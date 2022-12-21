import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: 'john@example.com',
    email: bcrypt.hashSync('123456', 10),
    password: bcrypt.hashSync('123456', 10),
    
  },
  {
    name: 'jane@example.com',
    email: bcrypt.hashSync('123456', 10),
    password: bcrypt.hashSync('123456', 10),
    
  },
]

export default users