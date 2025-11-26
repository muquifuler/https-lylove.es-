
import './styles/CardItem.css'

function CardItem({ data }) {

  console.log(data.rare)

  return (
    <div className='CardItem'>
        <div className='struct'>
          <div className='image'>
              <img src={data?.img} alt="" />
          </div>
        </div>
    </div>
  )
}

export default CardItem
