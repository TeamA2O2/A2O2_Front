import OngoingFunding from "./OngoingFunding";

export default function OngoingFundings() {
  const fundingData = {
    organizer: "홍길동",
    productName: "닌텐도 스위치를 내게로",
    progress: 23,
    imageSrc:
      "https://www.nintendo.co.kr/switch/modal/img/lineup/img-package--blueRed.png",
  };

  return (
    <div>
      <h1>펀딩 진행 페이지</h1>
      <OngoingFunding
        organizer={fundingData.organizer}
        productName={fundingData.productName}
        progress={fundingData.progress}
        imageSrc={fundingData.imageSrc}
      />
    </div>
  );
}
