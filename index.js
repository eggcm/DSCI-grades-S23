let data = {}
const p = document.getElementById('display-grade');


  Papa.parse("./StudentList-DSCI-2023-Spring-released.csv", {
// Papa.parse("test.csv", {
    download: true,
    encoding: "utf-8",
    complete: function(results) {
        let header = results.data.slice(0, 1)[0];
        let res = results.data.slice(1);

        grades = res.map(item => {
            let grade = {};
            for (i = 0; i < header.length; i++) {
                grade[header[i]] = item[i];
            }
            return grade;
        })

        for (const grade of grades) {
            data[grade[`序號`]]= grade;
        }
	}
})

function display() {
    const id = document.getElementById('sid').value;
    if (id=="") return;
    // p.innerText = JSON.stringify(data[id]);
    const display = `
    
    SID:${data[id].學號}
    組別(Group): ${data[id].Group}
    
    各項分數：
    H1: ${data[id].HW1}
    H2: ${data[id].HW2}
    H3: ${data[id].HW3}
    Proposal: ${data[id].Proposal}
    Demo: ${data[id].Demo}
    Report: ${data[id].Report}

    出席(5pts MAX)：
    Attend:${data[id].Attend}
    
    學期總成績：
    Sem: ${data[id].SEM}
    
    分數計算方式：
    The grade is determined by the following rule: (H1+H2+H3)/3*0.3+Proposal*0.2+Demo*0.2+Report*0.25+Attend.
    Note that the highest grade of this course is 99. If your final grade is large than 99, then you will get 99 at most.
    `;
    p.innerText = display;
}
