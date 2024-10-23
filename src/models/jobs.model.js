import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tejas.khandale100@gmail.com', // Your email
        pass: 'pxnn sask vqht bdqm'          // Your application password
    }
});

export default class JobsModel {
    constructor(company, role, desc, location, pay, applyDate, openings, applicants, skills) {
        this.id = currentId++; // Assign a unique ID to the job
        this.company = company;         // Name of the company
        this.role = role;               // Job role/title
        this.desc = desc;               // Description of the job
        this.location = location;       // Job location
        this.pay = pay;                 // Salary or pay range
        this.applyDate = applyDate;     // Application deadline
        this.openings = openings;       // Number of openings available
        this.applicants = applicants;   // Number of applicants so far
        this.skills = skills;           // Required skills for the job
    }

    static returnJobs() {
        return jobs; // Return the array of job instances
    }

    static async addApplicant(body, file, id) {
        // Find the job the applicant is applying for
        const job = jobs.find(j => j.id === id);
        
        // Check if the job exists
        if (!job) {
            return false; // Return false if job not found
        }
        
        // Create a new Applicant using the Applicant constructor
        const newApplicant = new Applicant(
            body.name,             // Applicant's name
            body.contact,          // Applicant's contact info
            body.email,            // Applicant's email
            file.filename,         // Resume file name
            file.path,             // Resume file location (path)
            job                    // Reference to the job they applied for
        );
        
        // Add the new applicant to the applicants array
        applicants.push(newApplicant);
    
        // Send an email to the applicant
        const mailOptions = {
            from: 'tejas.khandale100@gmail.com',            // Sender address
            to: body.email,                                // Applicant's email
            subject: `Application Received for ${job.role}`, // Subject line
            text: `Hello ${body.name},\n\nThank you for applying for the ${job.role} position at ${job.company}. We have received your application and will get back to you shortly.\n\nBest regards,\n${job.company}`, // Plain text body
            html: `<p>Hello ${body.name},</p>
                   <p>Thank you for applying for the <strong>${job.role}</strong> position at <strong>${job.company}</strong>. We have received your application and will get back to you shortly.</p>
                   <p>Best regards,<br>${job.company}</p>` // HTML body
        };
    
        // Send the email
        try {
            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
        }
    
        return true;
    }
    

    static addJob(body) {
        const skillsString = body.skills;
        const skillsArray = skillsString.split(',').map(skill => skill.trim());
        console.log(skillsArray);
        
        jobs.push(new JobsModel(
            body.company,
            body.role,
            body.desc,
            body.location,
            body.pay,
            body.applyDate,
            body.openings,
            0,
            skillsArray
        ))
        console.log(jobs);
        
        return true;
    }

    static deleteJob(id) {
       const index = jobs.findIndex(job => job.id === id);
       if (index !== -1) {
            jobs.splice(index, 1)
       }
       return true;
    }

    static editJobEntry(body, jobId) {
        const job = jobs.find(j => j.id === parseInt(jobId));
        console.log(job);
        
        
        if (!job) {
            return false; 
        }
    
       
        job.company = body.company;
        job.role = body.role;
        job.desc = body.desc;
        job.location = body.location;
        job.pay = body.pay;
        job.applyDate = body.applyDate;
        job.openings = parseInt(body.openings);
        const skillsString = body.skills;
        job.skills = skillsString.split(',').map(skill => skill.trim());
    
        return true;
    }

    static returnApplicants(jobId) {
        // Filter applicants whose job ID matches the jobId parameter
        const matchingApplicants = applicants.filter(applicant => applicant.job.id === parseInt(jobId));
    
        return matchingApplicants;
    }
    

}

let currentId = 1; // Initialize a counter for IDs

class Applicant {
    constructor(name, contact, email, resumeFilename, resumeLocation, job) {
        this.name = name;
        this.contact = contact;
        this.email = email;
        this.resumeFilename = resumeFilename;
        this.resumeLocation = resumeLocation;
        this.job = job; // Link the applicant to the specific job
    }
}

const applicants = []

const jobs = [
    new JobsModel(
        'Tech Solutions Inc.',
        'Software Engineer',
        'Develop and maintain web applications.',
        'New York, NY',
        '$80,000 - $100,000',
        '2024-12-31',
        3,
        15,
        ['JavaScript', 'React', 'Node.js']
    ),
    new JobsModel(
        'Creative Agency',
        'Graphic Designer',
        'Create stunning visuals for clients.',
        'Los Angeles, CA',
        '$60,000 - $75,000',
        '2024-11-15',
        2,
        8,
        ['Photoshop', 'Illustrator', 'InDesign']
    ),
    new JobsModel(
        'HealthTech Innovations',
        'Data Analyst',
        'Analyze data to drive business decisions.',
        'Remote',
        '$70,000 - $85,000',
        '2024-10-20',
        1,
        5,
        ['Excel', 'SQL', 'Python']
    ),
    new JobsModel(
        'Finance Corp',
        'Accountant',
        'Manage financial records and reports.',
        'Chicago, IL',
        '$65,000 - $80,000',
        '2024-12-01',
        1,
        10,
        ['QuickBooks', 'Excel', 'Accounting Principles']
    ),
    new JobsModel(
        'E-commerce Solutions',
        'Digital Marketing Specialist',
        'Drive online traffic and sales.',
        'San Francisco, CA',
        '$55,000 - $70,000',
        '2024-11-30',
        2,
        12,
        ['SEO', 'Google Analytics', 'Social Media Marketing']
    )
];