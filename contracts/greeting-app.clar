;; Greeting App Contract
;; Simple greeting application

;; Map to store greetings
(define-map greetings uint (tuple
    (sender principal)
    (receiver principal)
    (message (string-utf8 500))
    (timestamp uint)
    (read bool)
))

;; Map to store user emails
(define-map user-emails principal (string-utf8 100))

;; Counter for greeting ID
(define-data-var greeting-count uint u0)

;; Function to register email
(define-public (register-email (email (string-utf8 100)))
    (map-set user-emails tx-sender email)
    (ok email))

;; Function to send greeting
(define-public (send-greeting (receiver principal) (message (string-utf8 500)))
    (let ((id (+ (var-get greeting-count) u1)))
        (map-set greetings id (tuple
            (sender tx-sender)
            (receiver receiver)
            (message message)
            (timestamp (block-height (chain-state (block-info (current-block)))))
            (read false)))
        (var-set greeting-count id)
        (ok id)))

;; Function to mark as read
(define-public (mark-as-read (greeting-id uint))
    (let ((greeting (map-get? greetings greeting-id)))
        (if (and greeting (= (get receiver greeting) tx-sender))
            (map-set greetings greeting-id (tuple
                (sender (get sender greeting))
                (receiver (get receiver greeting))
                (message (get message greeting))
                (timestamp (get timestamp greeting))
                (read true)))
            (err u1))))

;; Function to get user greetings
(define-read-only (get-user-greetings (user principal))
    (let ((all-greetings (map-get? greetings u1)))
        (filter (lambda (greeting) 
            (or (= (get sender greeting) user) (= (get receiver greeting) user)))
        all-greetings)))

;; Function to get user email
(define-read-only (get-user-email (user principal))
    (map-get? user-emails user))

;; Function to get greeting count
(define-read-only (get-greeting-count)
    (var-get greeting-count)) 