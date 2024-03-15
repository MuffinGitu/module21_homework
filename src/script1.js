const xml = '<list> <student> <name lang="en"><first>Ivan</first><second>Ivanov</second></name><age>35</age><prof>teacher</prof></student><student><name lang="ru"><first>Петр</first><second>Петров</second></name><age>58</age><prof>driver</prof></student></list>';
const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xml, 'application/xml');

const students = Array.from(xmlDoc.getElementsByTagName('student')).map((student) => {
  const name = `${student.getElementsByTagName('first')[0].textContent} ${student.getElementsByTagName('second')[0].textContent}`;
  const age = Number(student.getElementsByTagName('age')[0].textContent);
  const prof = student.getElementsByTagName('prof')[0].textContent;
  const lang = student.getElementsByTagName('name')[0].getAttribute('lang');

  return { name, age, prof, lang };
});

const result = { list: students };
console.log(result);