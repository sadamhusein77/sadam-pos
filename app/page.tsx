
// import { useRouter } from "next/router";
import FormLogin from "./components/organisms/Login/Form";
import ImageSection from "./components/organisms/Login/ImageSection";

export default function Home() {
  // const route = useRouter()
  // const handleRoute = () => {
  //   route.push('/dashboard')
  // }
  return (
    <main className="min-w-full min-h-screen grid grid-cols-2">
        <ImageSection />
        <FormLogin  />
    </main>
  );
}
