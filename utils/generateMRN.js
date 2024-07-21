
module.exports = function generateMRN (fname, mname, lname) {

    const str = `${fname} ${mname} ${lname}`;
    const matches = str.match(/\b(\w)/g); 
    const acronym = matches.join('');
    const t = new Date();
    const date = ('0' + t.getDate()).slice(-2);
    const month = ('0' + (t.getMonth() + 1)).slice(-2);
    const year = t.getFullYear();
    const milliseconds = ('0' + t.getMilliseconds()).slice(-2);
    const MRN = `${year}/${month}/${date}/${acronym}${milliseconds}`;
    
    const newMRN = MRN.toString();
    return newMRN;

}