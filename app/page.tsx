import Homepage from "./home/Homepage";
import Container from "./components/Container";


export default function Home() {
  return (
    <div className="p-8">
      <Container>
        <div>
          <Homepage/>
        </div>
      </Container>
    </div>
  )
}
