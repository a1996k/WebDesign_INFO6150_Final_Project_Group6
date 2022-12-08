# Dorm Roommate Match

## Full Stack website for finding/matching a compatible dorm roommate

## Description

This fully functional website acts as a roommate matching service for college freshmen. The prospective student fills out a brief profile and responds to a 10-question survey about views toward and considerations for roommates. The survey and student profile are saved to a mySQL database and contrasted with those of the other students. A straightforward algorithm that compares answer sets determines the top three matches, which are then shown to the user.

- #### Front-End Technology

  - React.js, HTML, CSS, JavaScript (ES6 & some OOP), jQuery, Bootstrap, image placeholder generator web site links

  #### Back-End Technology

  - Node.js, Express.js, mySQL, JavaScript (ES6 & some OOP), NPM packages (express, mysql, path), API routes, Heroku

## Details:

Repository</a>

- #### Demo walkthru GIF : 

  - Use Cases seen in demo below
    - [x] new student enters profile/survey  (validation demonstrated) - gets matches from database
    - [x] new student re-enters profile/survey(changing answers) - gets new matches from database - does not get themselves as a match
    - [x] another new student enter profile/survey with almost identical  answers to above student - gets matches including above student as best match (assuming no other students have been added in the interium with identical answer sets)
    - [x] display of database students in JSON format via /api/get route





#### Screen Captures:


## Getting Started

### Native and NPM Packages Used

1. express  - for interactive command line response 
2. mysql - for database connectivity
3. path - for absolute and relative path resolution

### Dependencies

- none - Note:  responsive (but needs a few tweaks) - best viewed at or above 1400x1100


### Executing program

- navigate from home page to survey page
- enter name and link to web based photo if desired (default placeholder link will be used if no link entered)
- answer 10 question survey 
- review results showing top 3 matches
- API/student link will retrieve all database students/survey answers and display in JSON form

#### Possible Enhancements

- [ ] clean up the accuracy of responsiveness 
- [ ] change footer from fixed on viewport to fixed to content
- [ ] more robust user profile with authentication
- [ ] more complex and comprehensive survey and match algorithm

## Authors
krishna.ab@northeastern.edu
awasthi.s@northeastern.edu
thakkar.nai@northeastern.edu
sreekanthan.a@northeastern.edu

## Version History

- 1.0 - Initial Release

## License


