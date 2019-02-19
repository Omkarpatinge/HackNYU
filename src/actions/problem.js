export const getProblems = (q = '') => {
    return (dispatch) => {
        return fetch('/api/problems/search?q=' + q)
            .then(results => results.json())
            .then(data => {
                if (data.ok === true) {
                    dispatch({
                        type: 'LOAD_PROBLEMS',
                        data: data.data
                    });
                }
            });
    }
};
var abc =[{"text":"Hospital is very far from my village. If we could get real-time remote assistance from certified healthcare professionals, it would help save lives.","tags":["healthcare","rural"]},
    {"text":    "Smog has become a nuisance in New Delhi. Especially after festivals like Diwali. If we could regulate the way these fetivals are celebrated we could bring down pollution levels.","tags":["pollution","green house","Sustainability"]},
    {"text":    "Traffic congestion is a big problem in Bengaluru during peak office hours. We need a better traffic regulation system.","tags":["pollution","green house","Transport"]},
    {"text":    "I can,'t seem to track my expenses. If there could be a digital assistant who could trak my expenditures and suggest tips to save, it would be great","tags":["finance","planning"]},
    {"text":    "Vocational training for the youth in developing country will help the underpriviledged youth find good emplyoment opportunities. Facilitating cheap and accessible classes for the same will help educate our youth and increase employability.","tags":["education","rural","accessibility"]},
    {"text":    "Design an interactive remote classroom for the future. The students can participate remotely with the instructor in a virtual environment. It should ensure the advantages of the traditional classroom approach alongwith increasing enagegement and interest in the knowledge being imparted.","tags":["education","remote","Future tech"]},
    {"text":    "Create engaging content for difficult subjects for school children. Children have brief spans of attention, so is platform to design and maintain educational modules that are not longer than ,20 minutes but convey important core concepts in a visually appealing way, we can revolutionaize education and effectiveness of teaching.","tags":["education"]},
    {"text":    "I want a digital assistant to help me start investing in stock market. It will be great if it can point me to stocks that fit my risk profile and advise me on what stocks to buy when and when to sell them to get sizeable profits.","tags":["finance","recommendation","AI"]},
    {"text":    "CT-Scans, MRIs are very expensive. Can we somehow make a portable device that could reduce the costs of these scans? This can be used in rural places and provide accessibility of expensive treatments to everyone, irrespective of geographical or financial problems.","tags":["healthcare","diagonsis"]},
    {"text":    "I suffer from obesity and I want help with regulating my diet and nutrition. I am not rich enough to hire my own nutritionist but want to have a healthier lifesytle and loose weight.","tags":["healthcare","nutrition","lifestyle"]},
    {"text":    "24x7 doubt clearing expert during the exam season for school students. Help students clarify doubt in real-time to reduce exams anxiety and boost performance of children.","tags":["school","education"]},
    {"text":    "I want to teach my tween how to save and value money. An app that would make this a fun learning process for his age group would be very helpful.","tags":["finance","children","education"]},
    {"text":    "I want to save money to achieve certain goals in my life. I want an app that would automatically lock a certain amount of money every month, to help me reach my target.","tags":["finance","AI"]},
    {"text":    "I am a vegan and would like to find out healthier and vegan alternatives to standard meat options. They should help me satisfy my daily nutritional requirement without resorting to animal based products.","tags":["Vegan","health","nutrition"]},
    {"text":    "How can I reduce my energy and water bills every month,? I want to save money and do my part to save the planet,! We should all do our bit to save the earth from global warming.","tags":["energy","sustinability","global warming"]},
    {"text":    "I work for an NGO and we want to empower rural women by educating them about various means of contraceptives available to them today. An app that would aid me in this mission would be great.","tags":["rural","non profit"]}]


export const updateProblem = (payload) => ({
    type: 'UPDATE_PROBLEM',
    data: payload
});

