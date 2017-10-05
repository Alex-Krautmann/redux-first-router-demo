import { findVideos, findVideo } from './index';

describe('API function', () => {
    describe('findVideos(category, jwToken)', () => {
        describe('when no jwToken', () => {
            it('returns a empty array', async () => {
                expect(await findVideos('')).to.deep.equal([]);
            });
        });
        describe('when jwToken', () => {
            it('returns videos for "fp" category', async () => {
                const result = await findVideos('fp', 'token');
                expect(result[0].youtubeId).to.equal('6mTbuzafcII');
                expect(result[1].youtubeId).to.equal('zBHB9i8e3Kc');
                expect(result[2].youtubeId).to.equal('mty0RwkPmE8');
            });
            it('returns videos for "react-redux" category', async () => {
                const result = await findVideos('react-redux', 'token');
                expect(result[0].youtubeId).to.equal('qa72q70gAb4');
                expect(result[1].youtubeId).to.equal('zD_judE-bXk');
                expect(result[2].youtubeId).to.equal('uvAXVMwHJXU');
            });
            it('returns videos for "db-graphql" category', async () => {
                const result = await findVideos('db-graphql', 'token');
                expect(result[0].youtubeId).to.equal('fU9hR3kiOK0');
                expect(result[1].youtubeId).to.equal('_5VShOmnfQ0');
                expect(result[2].youtubeId).to.equal('m-hre1tt9C4');
            });
            it('returns empty array for unknown category', async () => {
                expect(await findVideos('something unknown', 'token')).to.deep.equal([]);
            });
        });
    });
    describe('findVideo(slug, jwToken)', () => {
        describe('when no jwToken', () => {
            it('returns null', async () => {
                expect(await findVideo('')).to.be.null;
            });
        });
        describe('when jwToken', () => {
            it('returns videos for known slug', async () => {
                const result = await findVideo('recomposing-your-react-application', 'token');
                expect(result.youtubeId).to.equal('zD_judE-bXk');
            });
            it('returns undefined for unknown slug', async () => {
                expect(await findVideo('something unknown', 'token')).to.be.undefined;
            });
        });
    });
});
