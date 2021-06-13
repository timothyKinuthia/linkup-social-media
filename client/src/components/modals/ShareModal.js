import { EmailShareButton, EmailIcon, FacebookShareButton, FacebookIcon, TelegramShareButton, TelegramIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon, RedditShareButton, RedditIcon } from "react-share";

const ShareModal = ({ url }) => {
    return (
        <div className="md:w-2/3 py-1 mx-o.5 flex justify-between">
            <FacebookShareButton url={url}>
                <FacebookIcon round={true} size={32} />
            </FacebookShareButton>

            <TwitterShareButton url={url}>
                <TwitterIcon round={true} size={32} />
            </TwitterShareButton>

            <EmailShareButton url={url}>
                <EmailIcon round={true} size={32} />
            </EmailShareButton>

            <TelegramShareButton url={url}>
                <TelegramIcon round={true} size={32} />
            </TelegramShareButton>

            <WhatsappShareButton url={url}>
                <WhatsappIcon round={true} size={32} />
            </WhatsappShareButton>

            <RedditShareButton url={url}>
                <RedditIcon round={true} size={32} />
            </RedditShareButton>
        </div>
    )
};

export default ShareModal
