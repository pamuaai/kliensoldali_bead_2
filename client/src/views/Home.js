import { Container } from "react-bootstrap";
export const Home = ({ setCurrentPage }) => {
    return (
        <Container className="pt-3">
            <h1>Feladatsorok Alkalmazás</h1>
            <p>Ez egy olyan webes alkalmazás, amelyben egy tanárnak lehetősége van egy feladatsort összeállítani, pl. óra vagy dolgozat céljából. A tanár létrehoz egy <span onClick={() => setCurrentPage("editTaskList")} className="text-info">új feladatsor</span>t, majd a <span onClick={() => setCurrentPage("taskBank")} className="text-info">feladatbankban</span> a feladatok között böngészve egy-egy feladatot hozzáad a <span onClick={() => setCurrentPage("editTaskList")} className="text-info">szerkesztésre jelölt feladatsor</span>hoz. A <span onClick={() => setCurrentPage("taskBank")} className="text-info">feladatok</span> és a <span onClick={() => setCurrentPage("myTaskLists")} className="text-info">feladatsorok</span> listázhatók, részleteik megtekinthetők, a feladatsorok szerkeszthetők.</p>
        </Container >
    );
}