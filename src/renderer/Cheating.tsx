import './Cheating.css';
import warning from './Warning.svg';

export default function Cheating() {
  return (
    <div className="cheating">
      <img src={warning} alt=""/>
      <div className="cheating-title">
        ดีดี! คุณทำให้งานเลี้ยงผิดหวัง
        ปาร์ตี้ที่จะพรากคุณภรรยาแมวตัวหนึ่งไปจากคุณ
      </div>
    </div>
  );
}
