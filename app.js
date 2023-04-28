const express = require('express');
const fs = require('fs');
const http = require('http');
const url = require('url');
// const slugify = require('slugify');
// const replaceTemplate = require('./modules/replaceTemplate');

// const tourController=')
const router = express.Router();
const toDoList = require('./models/toDoListModel');
const employeeModel = require('./models/employeeModel');

// app.set('view-engine', 'ejs');


// const DB = process.env.DATABASE.replace(`<PASSWORD>`, process.env.DATABASE_PASSWORD);

// mongoose.connect(DB, {
//     useNewUrlParser: true,
//     // useCreateIndex: true,
//     // useFindAndModify: false,
//     useUnifiedTopology: true
// }).then(con => {
//     console.log(con.connections);
//     console.log(`DB connection successful!`);
// })

const app = express();
const morgan = require('morgan');



app.use(express.urlencoded({extended:false}))

const financeRouter = require('./Routes/adminRoutes.js');
const employeeRouter = require('./Routes/employeeRoutes.js');
const taskRouter = require('./Routes/tasksRoutes.js');
const { query } = require('express');
const { Console } = require('console');

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.use()

const financeData = fs.readFileSync(`${__dirname}/dev-data/financeData.json`, 'utf-8');
const employeeData = fs.readFileSync(`${__dirname}/dev-data/employeeData.json`, 'utf-8');
const taskData = fs.readFileSync(`${__dirname}/dev-data/taskData.json`, 'utf-8');
const userData = fs.readFileSync(`${__dirname}/dev-data/userData.json`, 'utf-8');
const pendingProjectsData = fs.readFileSync(`${__dirname}/dev-data/pendingProjectsData.json`, 'utf-8');
const toDoListData = fs.readFileSync(`${__dirname}/dev-data/toDoListData.json`, 'utf-8');
const upcomingDeadlinesData = fs.readFileSync(`${__dirname}/dev-data/upcomingDeadlinesData.json`, 'utf-8');
const financeObj = JSON.parse(financeData);
const employeeObj = JSON.parse(employeeData);
const taskObj = JSON.parse(taskData);
const toDoListObj = JSON.parse(toDoListData);
const userObj = JSON.parse(userData);


// replace employee template card
const replaceEmployeeCard = (temp, product) => {
  let output = temp.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%NAME%}/g, product.name);
  output = output.replace(/{%DESIGNATION%}/g, product.designation);
  output = output.replace(/{%SALARY%}/g, product.salary);
  output = output.replace(/{%DEPARTMENT%}/g, product.department);
  output = output.replace(/{%EXPERIENCE%}/g, product.experience);
  output = output.replace(/{%XP_POINTS%}/g, product.totalXp);
  output = output.replace(/{%PENALTIES%}/g, product.totalPenalties);
  output = output.replace(/{%EFFICIENCY%}/g, ((product.totalXp - product.totalPenalties) / product.totalXp) * 100);
  output = output.replace(/{%HEALTH_INSURANCE%}/g, product.healthInsurance);
  output = output.replace(/{%EMAIL%}/g, product.email);
  output = output.replace(/{%PHONE%}/g, product.phone);
  output = output.replace(/{%ADDRESS%}/g, product.address);
  output = output.replace(/{%LAST_ASSIGNED_PROJECT%}/g, product.lastproject);
  return output;
}
const replaceProject = (temp, product) => {
  let output = temp.replace(/{%PROJECT_NAME%}/g, product.projectName);
  output = output.replace(/{%PROJECT_XP%}/g, product.projectXp);
  output = output.replace(/{%DEADLINE%}/g, product.deadline);
   return output;
}
const replaceFinanceCard = (temp, product) => {
  let output = temp.replace(/{%LAST_WEEK_PROFITT%}/g, product.revenue);
  output = output.replace(/{%THIS_WEEK_PROFIT%}/g, product.revenue - product.cost);
  // output = output.replace(/{%THIS_WEEK_INCOME%}/g, product.department);
  // output = output.replace(/{%LAST_MONTH_PROFIT%}/g, product.experience);
  // output = output.replace(/{%LAST_YEAR_PROFIT%}/g, product._EMXp);
  output = output.replace(/{%LAST_WEEK_COST%}/g, product.cost);
  // output = output.replace(/{%VIEW_PROFILE%}/g, product.id);
  return output;
}
// replace employee template card
const replaceProjectCard = (temp, product) => {
  let output = temp.replace(/{%PROJECT_NAME%}/g, product.task);
  // var date=product.
  output = output.replace(/{%DATE%}/g, product.dateAssigned);
  return output;
}

// replace employee template card
const replaceToDoListCard = (temp, product) => {
  let output = temp.replace(/{%MESSAGE%}/g, product.task);

  return output;
}
// replace upcoming projects template card
const replaceUpcomingProjectCard = (temp, product) => {
  let output;
  if (product.dateAssigned < product.deadline) {
    let output = temp.replace(/{%TASK%}/g, product.task);
    output = output.replace(/{%TIME_LEFT%}/g, product.deadline);
  }
  return output;
}

const tempAdmin = fs.readFileSync(
  `${__dirname}/public/admin.html`,
  "utf-8"
);
const upcomingDeadlineCard = fs.readFileSync(`${__dirname}/public/template-upcoming-deadline.html`, "utf-8");
const employeeCard = fs.readFileSync(
  `${__dirname}/public/template-employee.html`,
  "utf-8"
);
const pendingProjectCard = fs.readFileSync(
  `${__dirname}/public/template-pending-projects.html`,
  "utf-8"
);
const toDoListCard = fs.readFileSync(
  `${__dirname}/public/template-to-do-list.html`,
  "utf-8"
);
const financeCard = fs.readFileSync(
  `${__dirname}/public/template-finance-overview.html`,
  "utf-8"
);
const employeePage = fs.readFileSync(
  `${__dirname}/public/employee.html`,
  "utf-8"
);
const employeeProfile = fs.readFileSync(
  `${__dirname}/public/template-employee-profile.html`,
  "utf-8"
);
const employeeProfileHtml = fs.readFileSync(
  `${__dirname}/public/employee-profile.html`, "utf-8"
);
const emp = fs.readFileSync(
  `${__dirname}/public/assign-project.html`, "utf-8"
);
const toDoListTemp = fs.readFileSync(
  `${__dirname}/public/to-do-list.html`, "utf-8"
);
const loginTemp = fs.readFileSync(
  `${__dirname}/public/login-page.html`, "utf-8"
);

// Query Url


app.get('/', (req, res) => {
  // const file=fs.readFile(`${__dirname}/public/overview.html`);
  res.sendFile(`${__dirname}/public/index.html`);
})
app.get('/home', (req, res) => {
  // const file=fs.readFile(`${__dirname}/public/overview.html`);
  res.sendFile(`${__dirname}/public/overview.html`);
})

const users = []

app.get('/login', async (req, res) => {
  res.end(loginTemp);
});

app.post('/login', async (req, res)=>{
  try{
    const username=req.body.username;
    const password=req.body.password;
    
    console.log(`Email:${username}, Password:${password}`)

    // const userEmail = await userObj.findOne({username:username});
    // const userKey = await userObj.findOne({password:password});

    if((username==='john.douglous@hotmail.com' && password==='123456')){
      res.redirect('/admin-employee');
      // res.setHeader('Location', '/admin-employee');
      // res.end()
    }
 
} catch(error){
  res.status(400).send('Invalid Email or Password!');
}
})

app.get('/add-to-list', (req, res) => {
  res.end(toDoListTemp);
})

// app.post('/')

app.post('/add-to-list-post', async (req, res) => {
  try {
    const newTask = await toDoList.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail request',
      message: 'Invalid Data Sent!'
    });
  }
  res.send('/admin');
})

app.get('/admin', (req, res) => {
  // const file=fs.readFile(`${__dirname}/public/overview.html`);
  // res.writeHead(200, { "Content-type": "text/html" });
  const projects = taskObj
    .map((el) => replaceProjectCard(pendingProjectCard, el))
    .join('');
  const deadlines = taskObj
    .map((el) => replaceUpcomingProjectCard(upcomingDeadlineCard, el))
    .join('');
  const toDoList = toDoListObj
    .map((el) => replaceToDoListCard(toDoListCard, el))
    .join('');
  // const finance = financeObj
  //   .map((el) => replaceFinanceCard(financeCard, el))
  //   .join('');

  let output = tempAdmin.replace("{%PENDING_PROJECT_CARD%}", projects);
  output = output.replace("%DEADLINES_CARD%", deadlines);
  output = output.replace("%TO_DO_LIST_CARD%", toDoList);
  // output = output.replace("{%EMPLOYEE_CARD%}", employee);
  res.end(output);
  // res.sendFile(`${__dirname}/public/admin.html`);
});
app.get('/admin-finance', (req, res) => {
  // const file=fs.readFile(`${__dirname}/public/overview.html`);
  // res.writeHead(200, { "Content-type": "text/html" });

  const finance = financeObj
    .map((el) => replaceFinanceCard(financeCard, el))
    .join('');

  const output = tempAdmin.replace("{%STATISTICS_TEMPLATE%}", finance);

  res.end(output);
  // res.sendFile(`${__dirname}/public/admin.html`);
});
app.get('/admin-employee', (req, res) => {
  const size = Object(employeeObj).length;
  const employee = employeeObj
    .map((el) => replaceEmployeeCard(employeeCard, el))
    .join('');
  let output = employeePage.replace("{%EMPLOYEE_CARD%}", employee);
  output=output.replace("{%TOTAL_EMPLOYEES%}", size);
  res.end(output);
  // res.sendFile(`${__dirname}/public/admin.html`);
});

const addEmployee=fs.readFileSync(`${__dirname}/public/add-employee.html`);

app.get('/add-employee', (req, res)=> {
  res.end(addEmployee);
})
app.post('/add-employee', (req, res)=> {
  const employeeid=req.body.id;
  const name=req.body.name;
  const experience=req.body.experience;
  const designation=req.body.designation;
  const department=req.body.department;
  const salary=req.body.salary;
  const totalXp=req.body.totalXp;
  const totalPenalties=req.body.totalPenalties;
  const healthInsurance=req.body.healthInsurance;
  const email=req.body.email;
  const phone=req.body.phone;
  const address=req.body.address;
  const lastProject=req.body.lastProject;


  const user = []
  user.push(employeeid);
  user.push(name);
  user.push(designation);
  user.push(department);
  user.push(salary);
  user.push(totalXp);
  user.push(totalPenalties);
  user.push(healthInsurance);
  user.push(email);
  user.push(phone);
  user.push(address);
  user.push(lastProject);

  employeeObj.push(user);
  res.redirect('/admin-employee');

})

app.get('/employee-profile', (req, res) => {
  const quer = url.parse(req.url, true);
  // console.log(quer);

  const product = employeeObj.map((el) => replaceEmployeeCard(employeeCard, el))
    .join('');
  const output = replaceEmployeeCard(employeeProfile, product);
  res.end(output);

});

app.get('/assign-project', (req, res) => {
  // const employee = employeeObj[query.id];
  // const output = replaceEmployeeCard(emp, employee)
  res.end(emp);
  // res.sendFile(`${__dirname}/public/admin.html`);
});

app.post('/assign-project', (req, res) => {
  // const employee = employeeObj[query.id];
  // const output = replaceEmployeeCard(emp, employee)
  
  // const projectName = 
  // res.sendFile(`${__dirname}/public/admin.html`);
});

const viewProjects=fs.readFileSync(`${__dirname}/public/projects.html`);
const Projects=fs.readFileSync(`${__dirname}/public/template-project.html`);
const projectData=fs.readFileSync(`${__dirname}/dev-data/projectsData.json`);
const projectObj=JSON.parse(projectData);
// app.get('/assign-project', (req, res) => {
//   res.end(`<h1>Hello From The Server</h1>`);
// });
app.get('/view-projects', (req, res) => {
  const projects = projectObj
    .map((el) => replaceProject(Projects, el))
    .join('');

  let output = viewProjects.replace("{%PROJECT_CARD%}", projects);
  // output = output.replace("{%EMPLOYEE_CARD%}", employee);
  res.end(output);

  // res.end(viewProjects);
});

app.get('/add-employee', (req, res) => {
  // const employee = employeeObj[query.id];
  // const output = replaceEmployeeCard(emp, employee)
  res.end(emp);
  // res.sendFile(`${__dirname}/public/admin.html`);
});
app.post('/add-employee', (req, res) => {
  // const employee = employeeObj[query.id];
  // const output = replaceEmployeeCard(emp, employee)
  res.end(emp);
  // res.sendFile(`${__dirname}/public/admin.html`);
});


app.use('/api/v1/finance', financeRouter);
app.use('/api/v1/employee', employeeRouter);
app.use('/api/v1/task', taskRouter);

module.exports = app;

/*

Devil's Advocate - El Pacino

*/