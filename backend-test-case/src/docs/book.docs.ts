/**
 * @swagger
 * /books:
 *   get:
 *     summary: List all books
 *     description: Retrieves a list of books including details like title, author, and stock.
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: Successfully retrieved list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: List of books found.
 *                 bookList:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       code:
 *                         type: string
 *                         example: HOB-8rigi
 *                       title:
 *                         type: string
 *                         example: The Hobbit, or There and Back Again
 *                       author:
 *                         type: string
 *                         example: J.R.R. Tolkien
 *                       stock:
 *                         type: integer
 *                         example: 1
 *                 totalTitle:
 *                   type: integer
 *                   example: 1
 *                 totalStock:
 *                   type: integer
 *                   example: 1
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /books/borrow:
 *   post:
 *     summary: Borrow a book
 *     description: Allows a member to borrow a book.
 *     tags:
 *       - Books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *                 example: M001
 *               bookCode:
 *                 type: string
 *                 example: JK-45
 *     responses:
 *       201:
 *         description: Successfully borrowed the book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: New borrowed list created
 *                 newBorrowedList:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: d1db50a4-d88c-445f-9b6a-8e26f5ce9f1c
 *                     bookCode:
 *                       type: string
 *                       example: JK-45
 *                     memberCode:
 *                       type: string
 *                       example: M001
 *                     borrowDate:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-08-16T07:08:15.400Z
 *                     returnDate:
 *                       type: string
 *                       format: date-time
 *                       nullable: true
 *                       example: null
 *                     returned:
 *                       type: boolean
 *                       example: false
 *       400:
 *         description: Error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Book is out of stock.
 */

/**
 * @swagger
 * /books/return:
 *   patch:
 *     summary: Return a borrowed book
 *     description: Allows a member to return a borrowed book.
 *     tags:
 *       - Books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *                 example: M001
 *               bookCode:
 *                 type: string
 *                 example: JK-45
 *     responses:
 *       200:
 *         description: Successfully returned the book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: Book returned.
 *       400:
 *         description: Error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Book is not borrowed by member.
 */