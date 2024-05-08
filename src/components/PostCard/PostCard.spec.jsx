import { render, screen } from "@testing-library/react";
import { PostCard } from ".";
import { postCardMock } from "./mock";

const props = postCardMock;

describe('<PostCard />', ()=>{
    it('should render', ()=>{
        render(<PostCard {...props} />);

        expect(screen.getByRole('img', {name: props.title})).toBeInTheDocument();

        expect(screen.getByAltText(props.title)).toHaveAttribute('src', props.cover);

        expect(screen.getByRole('heading', {name: props.title})).toBeInTheDocument();

        expect(screen.getByText(props.body)).toBeInTheDocument();
    });

    it('should match snapshot', ()=>{
        const {container} = render(<PostCard {...props} />);

        const {firstChild} = container;
        
        expect(firstChild).toMatchSnapshot();

    });
});