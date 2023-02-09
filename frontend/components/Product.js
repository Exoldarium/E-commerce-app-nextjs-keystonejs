export default function Product({ product }) {
  return (
    <div>
      <span key={product.id}>
        <img
          src={product.photo?.image?.publicUrlTransformed}
          alt={product.description}
        />
        <p key={product.id}>{product.name}</p>
      </span>
    </div>
  );
}
