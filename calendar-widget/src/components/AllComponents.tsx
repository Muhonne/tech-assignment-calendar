/**
 * Could be simpler to have named components like Title, Header or smth
 * But since text styles were defined for html elements let's just go with that
 * and this file contains all elements that can be reused in all views
 * @returns all components that have styles
 */

export default function AllComponents() {
  return (
    <>
      <h1>Test h1</h1>
      <h2>test h2</h2>
      <h3>test h3</h3>
      <table><thead><tr><th>test th</th></tr></thead></table>
      <div className="bg-black"><p className="white">white on black</p></div>
      <div className="bg-green"><p className="black">black on green</p></div>
      <div className="bg-white"><p className="green">green on white</p></div>
    </>
  );
}
