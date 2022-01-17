const resolvers = {
    getSmallerVersionOfProjectorView: (slideWidth: number, projectorViewWidth: number, projectorViewHeight: number) => {
        if (!slideWidth) throw Error('slideWidth is not defined')
        projectorViewWidth = projectorViewWidth ?? 260;
        projectorViewHeight = projectorViewHeight ?? 146.25

        const ratio = projectorViewHeight /
            projectorViewWidth;

        const cinemaScopeRatio = 1 / 2.35
        const squareRatio = 1

        // Min is a square
        if (ratio > squareRatio) {
            return slideWidth
        }

        // Max is cinemascope ratio
        if (ratio < cinemaScopeRatio) {
            return cinemaScopeRatio * slideWidth
        }

        return ratio * slideWidth;
    }
}
export default resolvers;