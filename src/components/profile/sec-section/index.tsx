import RecentGames from './RecentGames'
import Results from './Results'

const SecondSection = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:gap-y-8 items-stretch gap-x-8">
        <RecentGames />
        <Results />
    </div>
  )
}

export default SecondSection