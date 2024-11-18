export const getKoreanDate = (value: Date) => {
    return value.toLocaleString("ko-KR", {
        timeZone: "Asia/Seoul",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).replace(/\./g, '').trim().replace(/ /g, '-');
}