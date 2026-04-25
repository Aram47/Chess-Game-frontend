import type { GameHistoryItem } from "../../../types/gameType";

interface AnalyzeIconProps {
  games: GameHistoryItem[];
}

export const AnalyzeIcon = ({ games }: AnalyzeIconProps) => {
  return (
    <div className="rounded-full bg-[#E5CC7A14] border-1 border-[#E5CC7A14] flex justify-center items-center w-10 h-10">
      {games.length === 0 ? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.6 9.3H5.25C4.65326 9.3 4.08097 9.06295 3.65901 8.64099C3.23705 8.21903 3 7.64674 3 7.05C3 6.45326 3.23705 5.88097 3.65901 5.45901C4.08097 5.03705 4.65326 4.8 5.25 4.8H6.6M6.6 9.3V3H17.4V9.3M6.6 9.3C6.6 10.7322 7.16893 12.1057 8.18162 13.1184C9.19432 14.1311 10.5678 14.7 12 14.7C13.4322 14.7 14.8057 14.1311 15.8184 13.1184C16.8311 12.1057 17.4 10.7322 17.4 9.3M17.4 9.3H18.75C19.3467 9.3 19.919 9.06295 20.341 8.64099C20.7629 8.21903 21 7.64674 21 7.05C21 6.45326 20.7629 5.88097 20.341 5.45901C19.919 5.03705 19.3467 4.8 18.75 4.8H17.4M4.8 21H19.2M10.2 14.394V16.5C10.2 16.995 9.777 17.382 9.327 17.589C8.265 18.075 7.5 19.416 7.5 21M13.8 14.394V16.5C13.8 16.995 14.223 17.382 14.673 17.589C15.735 18.075 16.5 19.416 16.5 21"
            stroke="#A39589"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.8296 12.5C14.8296 13.2388 14.5315 13.9474 14.0008 14.4698C13.4702 14.9922 12.7505 15.2857 12 15.2857C11.2495 15.2857 10.5298 14.9922 9.99917 14.4698C9.46852 13.9474 9.1704 13.2388 9.1704 12.5C9.1704 11.7612 9.46852 11.0526 9.99917 10.5302C10.5298 10.0078 11.2495 9.71429 12 9.71429C12.7505 9.71429 13.4702 10.0078 14.0008 10.5302C14.5315 11.0526 14.8296 11.7612 14.8296 12.5Z"
            stroke="#A39589"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 12.5C4.20163 8.73279 7.7773 6 12 6C16.2236 6 19.7984 8.73279 21 12.5C19.7984 16.2672 16.2236 19 12 19C7.7773 19 4.20163 16.2672 3 12.5Z"
            stroke="#A39589"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};
